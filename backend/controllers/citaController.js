const { readDB, writeDB, generateNewId } = require('../models/database');

// Configurable working hours and default duration
const startTime = '09:00';
const endTime = '18:00';
const defaultDuration = 30; // minutes

// Helper function to parse time string (HH:MM) to minutes from midnight
function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

// Helper function to format minutes from midnight to time string (HH:MM)
function minutesToTime(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Checks if a given time slot is available.
 * @param {object} db - The database object.
 * @param {string} fecha - Date in YYYY-MM-DD format.
 * @param {string} hora - Time in HH:MM format.
 * @param {number} duracion - Duration in minutes.
 * @param {number|null} existingCitaId - ID of an existing cita to exclude from checks (for updates).
 * @returns {boolean} - True if the slot is available, false otherwise.
 */
async function isSlotAvailable(db, fecha, hora, duracion, existingCitaId = null) {
  const requestedStartTimeMinutes = timeToMinutes(hora);
  const requestedEndTimeMinutes = requestedStartTimeMinutes + duracion;

  const workingStartMinutes = timeToMinutes(startTime);
  const workingEndMinutes = timeToMinutes(endTime);

  // Check if the slot is within working hours
  if (requestedStartTimeMinutes < workingStartMinutes || requestedEndTimeMinutes > workingEndMinutes) {
    return false;
  }

  const citasForDate = db.citas.filter(cita => 
    cita.fecha === fecha && 
    cita.estado !== 'cancelada' &&
    (existingCitaId === null || cita.id !== existingCitaId)
  );

  for (const cita of citasForDate) {
    const existingSlotStartMinutes = timeToMinutes(cita.hora);
    const existingSlotEndMinutes = existingSlotStartMinutes + cita.duracion;

    // Check for overlap
    if (requestedStartTimeMinutes < existingSlotEndMinutes && requestedEndTimeMinutes > existingSlotStartMinutes) {
      return false; // Slot overlaps with an existing appointment
    }
  }

  return true; // Slot is available
}

async function createCita(req, res) {
  try {
    const { leadId, fecha, hora, duracion = defaultDuration, notas } = req.body;

    // Validate inputs
    if (!leadId || !fecha || !hora) {
      return res.status(400).json({ message: 'leadId, fecha, and hora are required' });
    }
    if (typeof duracion !== 'number' || duracion <= 0) {
      return res.status(400).json({ message: 'duracion must be a positive number' });
    }
    // Basic date format validation (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return res.status(400).json({ message: 'Invalid fecha format. Use YYYY-MM-DD' });
    }
    // Basic time format validation (HH:MM)
    if (!/^\d{2}:\d{2}$/.test(hora)) {
        return res.status(400).json({ message: 'Invalid hora format. Use HH:MM' });
    }


    const db = await readDB();

    // Check if leadId exists
    const leadExists = db.leads.some(lead => lead.id === parseInt(leadId));
    if (!leadExists) {
      return res.status(404).json({ message: `Lead with id ${leadId} not found` });
    }

    // Check availability
    if (!await isSlotAvailable(db, fecha, hora, duracion)) {
      return res.status(409).json({ message: 'Requested time slot is not available' });
    }

    const newId = generateNewId(db.citas);
    const newCita = {
      id: newId,
      leadId: parseInt(leadId),
      fecha,
      hora,
      duracion,
      notas: notas || '',
      estado: 'programada', // Default state
      fechaCreacion: new Date().toISOString(),
    };

    db.citas.push(newCita);
    await writeDB(db);

    res.status(201).json(newCita);
  } catch (error) {
    console.error('Error creating cita:', error);
    res.status(500).json({ message: 'Error creating cita' });
  }
}

async function getAvailableSlots(req, res) {
  try {
    const { fecha } = req.query;

    if (!fecha) {
      return res.status(400).json({ message: 'fecha query parameter is required' });
    }
    // Basic date format validation (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        return res.status(400).json({ message: 'Invalid fecha format. Use YYYY-MM-DD' });
    }

    const db = await readDB();
    const availableSlots = [];
    const slotDuracion = defaultDuration; // Use default duration for checking slots

    const workingStartMinutes = timeToMinutes(startTime);
    const workingEndMinutes = timeToMinutes(endTime);

    for (let currentMinutes = workingStartMinutes; currentMinutes < workingEndMinutes; currentMinutes += slotDuracion) {
      const slotHora = minutesToTime(currentMinutes);
      // Ensure the slot itself doesn't exceed working hours
      if (currentMinutes + slotDuracion <= workingEndMinutes) {
        if (await isSlotAvailable(db, fecha, slotHora, slotDuracion)) {
          availableSlots.push(slotHora);
        }
      }
    }

    res.status(200).json(availableSlots);
  } catch (error) {
    console.error('Error getting available slots:', error);
    res.status(500).json({ message: 'Error getting available slots' });
  }
}

async function getAllCitas(req, res) {
  try {
    const db = await readDB();
    let citas = db.citas;

    const { estado, fechaInicio, fechaFin } = req.query;

    if (estado) {
      citas = citas.filter(cita => cita.estado === estado);
    }

    if (fechaInicio) {
      // Basic date format validation (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaInicio)) {
        return res.status(400).json({ message: 'Invalid fechaInicio format. Use YYYY-MM-DD' });
      }
      citas = citas.filter(cita => new Date(cita.fecha) >= new Date(fechaInicio));
    }

    if (fechaFin) {
      // Basic date format validation (YYYY-MM-DD)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(fechaFin)) {
        return res.status(400).json({ message: 'Invalid fechaFin format. Use YYYY-MM-DD' });
      }
      citas = citas.filter(cita => new Date(cita.fecha) <= new Date(fechaFin));
    }
    
    // Pagination (optional, similar to leads)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedCitas = citas.slice(startIndex, endIndex);
    const totalCitas = citas.length;
    const totalPages = Math.ceil(totalCitas / limit);


    res.status(200).json({
        citas: paginatedCitas,
        totalCitas,
        totalPages,
        currentPage: page,
    });
  } catch (error) {
    console.error('Error getting all citas:', error);
    res.status(500).json({ message: 'Error getting all citas' });
  }
}

async function cancelCita(req, res) {
  try {
    const citaId = parseInt(req.params.id, 10);
    if (isNaN(citaId)) {
        return res.status(400).json({ message: 'Invalid Cita ID format' });
    }

    const db = await readDB();
    const citaIndex = db.citas.findIndex(cita => cita.id === citaId);

    if (citaIndex === -1) {
      return res.status(404).json({ message: `Cita with id ${citaId} not found` });
    }

    if (db.citas[citaIndex].estado === 'cancelada') {
        return res.status(400).json({ message: `Cita with id ${citaId} is already canceled` });
    }

    db.citas[citaIndex].estado = 'cancelada';
    db.citas[citaIndex].fechaCancelacion = new Date().toISOString(); // Add cancellation timestamp

    await writeDB(db);

    res.status(200).json(db.citas[citaIndex]);
  } catch (error) {
    console.error('Error canceling cita:', error);
    res.status(500).json({ message: 'Error canceling cita' });
  }
}

module.exports = {
  createCita,
  getAvailableSlots,
  getAllCitas,
  cancelCita,
  // Exporting for potential testing or direct use if needed elsewhere
  isSlotAvailable, 
  timeToMinutes,
  minutesToTime 
};
