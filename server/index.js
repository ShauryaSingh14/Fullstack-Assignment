const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const chemicalRouter = require('./routes/route.chemical.js');

const app = express();
const db = require('./models');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Routes for chemical-related operations
app.use('/api/chemicals', chemicalRouter);

// Database Connection
const connect = () => {
    try {
        db.sequelize.sync().then(
            console.log("Connected to SQL Database")
        );
    } catch (err) {
        console.log(`Error
         connecting to SQL database. Error: `, err);
    }
};

// Start the server and connect to the database
app.listen(2301, () => {
    connect();
    console.log("Connected to Server");
});
