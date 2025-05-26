const express = require('express');
const corsMiddleware = require('./middleware/cors'); // Or directly use require('cors')()
const leadRoutes = require('./routes/leads');
const citaRoutes = require('./routes/citas');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig'); // Will create this next

const app = express();
const PORT = process.env.PORT || 3001;

// Apply middleware
app.use(corsMiddleware);
app.use(express.json()); // To parse JSON request bodies

// API routes
app.use('/api/leads', leadRoutes);
app.use('/api/citas', citaRoutes);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Simple root route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

// Basic global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export for potential testing
