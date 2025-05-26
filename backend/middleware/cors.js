const cors = require('cors');

// Basic CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins for simplicity in development
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};

module.exports = cors(corsOptions);
