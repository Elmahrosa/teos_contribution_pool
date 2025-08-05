const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contributionRoutes = require('./routes/contributionRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./utils/db');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/contributions', contributionRoutes);
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});
