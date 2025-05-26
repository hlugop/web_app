const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lead and Appointment Management API',
      version: '1.0.0',
      description: 'API documentation for managing leads and appointments for a CRM.',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Adjust if your port is different
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Lead: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the lead.',
              example: 1,
            },
            nombre: {
              type: 'string',
              description: 'Name of the lead.',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email of the lead.',
              example: 'john.doe@example.com',
            },
            telefono: {
              type: 'string',
              description: 'Phone number of the lead.',
              example: '123-456-7890',
            },
            empresa: {
              type: 'string',
              description: 'Company the lead works for.',
              example: 'Example Corp',
            },
            fechaRegistro: {
              type: 'string',
              format: 'date',
              description: 'Date when the lead was registered.',
              example: '2023-10-27',
            },
          },
        },
        Cita: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Unique identifier for the appointment.',
            },
            leadId: {
              type: 'integer',
              description: 'ID of the associated lead.',
            },
            fecha: {
              type: 'string',
              format: 'date',
              description: 'Date of the appointment (YYYY-MM-DD).',
            },
            hora: {
              type: 'string',
              pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
              description: 'Time of the appointment (HH:MM).',
            },
            duracion: {
              type: 'integer',
              description: 'Duration of the appointment in minutes.',
            },
            estado: {
              type: 'string',
              enum: ['programada', 'completada', 'cancelada'],
              description: 'Status of the appointment.',
            },
            notas: {
              type: 'string',
              description: 'Additional notes for the appointment.',
            },
            fechaCreacion: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp of when the cita was created.',
            },
            fechaCancelacion: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              description: 'Timestamp of when the cita was cancelled.',
            },
          },
        },
      },
    },
  },
  // Path to the API docs
  // Include all .js files in routes for JSDoc annotations
  apis: ['./backend/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
