const { readDB, writeDB, generateNewId } = require('../models/database');

async function registerLead(req, res) {
  try {
    const { nombre, email, telefono, empresa } = req.body;

    if (!nombre || !email || !telefono || !empresa) {
      return res.status(400).json({ message: 'Nombre, email, telefono, and empresa are required' });
    }

    const db = await readDB();
    const newId = generateNewId(db.leads);
    const fechaRegistro = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const newLead = {
      id: newId,
      nombre,
      email,
      telefono,
      empresa,
      fechaRegistro,
    };

    db.leads.push(newLead);
    await writeDB(db);

    res.status(201).json(newLead);
  } catch (error) {
    console.error('Error registering lead:', error);
    res.status(500).json({ message: 'Error registering lead' });
  }
}

async function getAllLeads(req, res) {
  try {
    const db = await readDB();
    let leads = db.leads;

    // Filtering
    const { nombre, empresa } = req.query;
    if (nombre) {
      leads = leads.filter(lead => lead.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    if (empresa) {
      leads = leads.filter(lead => lead.empresa.toLowerCase().includes(empresa.toLowerCase()));
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedLeads = leads.slice(startIndex, endIndex);
    const totalLeads = leads.length;
    const totalPages = Math.ceil(totalLeads / limit);

    res.status(200).json({
      leads: paginatedLeads,
      totalLeads,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error getting all leads:', error);
    res.status(500).json({ message: 'Error getting all leads' });
  }
}

module.exports = {
  registerLead,
  getAllLeads,
};
