require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Connect to Database
connectDB(); 

const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable for easier third-party assets for now
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, '../../frontend')));

// Routes
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to ECLIPSE API' });
});

// Products Route Placeholder
app.use('/api/products', require('./routes/productRoutes'));
// Auth Route Placeholder
app.use('/api/auth', require('./routes/authRoutes'));

// Serve Frontend for any non-API routes (SPA support)
app.use((req, res) => {
    if (!req.url.startsWith('/api')) {
        res.sendFile(path.join(__dirname, '../../frontend/index.html'));
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
