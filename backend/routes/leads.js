const express = require('express');
const leadController = require('../controllers/leadController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Leads
 *   description: Lead management and retrieval
 */

/**
 * @swagger
 * /api/leads:
 *   post:
 *     summary: Register a new lead
 *     tags: [Leads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - telefono
 *               - empresa
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Name of the lead.
 *                 example: "Jane Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the lead.
 *                 example: "jane.doe@example.com"
 *               telefono:
 *                 type: string
 *                 description: Phone number of the lead.
 *                 example: "098-765-4321"
 *               empresa:
 *                 type: string
 *                 description: Company the lead works for.
 *                 example: "Innovate Ltd."
 *     responses:
 *       201:
 *         description: Lead registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lead'
 *       400:
 *         description: Invalid input. Nombre, email, telefono, and empresa are required.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Nombre, email, telefono, and empresa are required"
 *       500:
 *         description: Error registering lead.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error registering lead"
 */
router.post('/', leadController.registerLead);

/**
 * @swagger
 * /api/leads:
 *   get:
 *     summary: Get all leads with filtering and pagination
 *     tags: [Leads]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Filter by lead name (case-insensitive).
 *         example: "Jane"
 *       - in: query
 *         name: empresa
 *         schema:
 *           type: string
 *         description: Filter by company name (case-insensitive).
 *         example: "Innovate"
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
 *         description: Number of leads per page.
 *     responses:
 *       200:
 *         description: A list of leads.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 leads:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Lead'
 *                 totalLeads:
 *                   type: integer
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Error getting leads.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error getting all leads"
 */
router.get('/', leadController.getAllLeads);

module.exports = router;
