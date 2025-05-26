const express = require('express');
const citaController = require('../controllers/citaController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: Appointment management and scheduling
 */

/**
 * @swagger
 * /api/citas:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Citas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - leadId
 *               - fecha
 *               - hora
 *             properties:
 *               leadId:
 *                 type: integer
 *                 description: ID of the lead for the appointment.
 *                 example: 1
 *               fecha:
 *                 type: string
 *                 format: date
 *                 description: Date of the appointment (YYYY-MM-DD).
 *                 example: "2024-08-15"
 *               hora:
 *                 type: string
 *                 pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'
 *                 description: Time of the appointment (HH:MM).
 *                 example: "14:30"
 *               duracion:
 *                 type: integer
 *                 description: Duration of the appointment in minutes. Default is 30.
 *                 example: 30
 *                 default: 30
 *               notas:
 *                 type: string
 *                 description: Optional notes for the appointment.
 *                 example: "Follow-up meeting regarding project proposal."
 *     responses:
 *       201:
 *         description: Appointment created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       400:
 *         description: Invalid input (e.g., missing fields, invalid format, lead not found, time slot conflict).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "leadId, fecha, and hora are required"
 *       404:
 *         description: Lead not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lead with id 1 not found"
 *       409:
 *         description: Requested time slot is not available.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Requested time slot is not available"
 *       500:
 *         description: Error creating appointment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error creating cita"
 */
router.post('/', citaController.createCita);

/**
 * @swagger
 * /api/citas/disponibles:
 *   get:
 *     summary: Get available appointment slots for a given date
 *     tags: [Citas]
 *     parameters:
 *       - in: query
 *         name: fecha
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to check for available slots (YYYY-MM-DD).
 *         example: "2024-08-15"
 *     responses:
 *       200:
 *         description: An array of available time slots (HH:MM).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "09:30"
 *       400:
 *         description: Missing or invalid fecha query parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "fecha query parameter is required"
 *       500:
 *         description: Error getting available slots.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error getting available slots"
 */
router.get('/disponibles', citaController.getAvailableSlots);

/**
 * @swagger
 * /api/citas:
 *   get:
 *     summary: Get all appointments with filtering and pagination
 *     tags: [Citas]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [programada, completada, cancelada]
 *         description: Filter by appointment status.
 *         example: "programada"
 *       - in: query
 *         name: fechaInicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by start date (YYYY-MM-DD). Inclusive.
 *         example: "2024-08-01"
 *       - in: query
 *         name: fechaFin
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by end date (YYYY-MM-DD). Inclusive.
 *         example: "2024-08-31"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of appointments per page.
 *     responses:
 *       200:
 *         description: A list of appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 citas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cita'
 *                 totalCitas:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid filter parameters (e.g., invalid date format).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid fechaInicio format. Use YYYY-MM-DD"
 *       500:
 *         description: Error getting appointments.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error getting all citas"
 */
router.get('/', citaController.getAllCitas);

/**
 * @swagger
 * /api/citas/{id}:
 *   delete:
 *     summary: Cancel an appointment
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the appointment to cancel.
 *         example: 1
 *     responses:
 *       200:
 *         description: Appointment canceled successfully. The updated cita object is returned.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       400:
 *         description: Invalid Cita ID format or Cita already cancelled.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Cita ID format"
 *       404:
 *         description: Appointment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cita with id 1 not found"
 *       500:
 *         description: Error canceling appointment.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error canceling cita"
 */
router.delete('/:id', citaController.cancelCita);

module.exports = router;
