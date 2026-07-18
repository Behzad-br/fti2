const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Parent Router
const apiRoutes = require('./routes');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); // Support large images (base64)
app.use(cors());

// Health Check
app.get('/', (req, res) => {
    res.send('FTI Journey API is running with MVC structure...');
});

// API Routes
app.use('/api', apiRoutes);

// Unmatched Routes
app.use(notFound);

// Global Error Handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
