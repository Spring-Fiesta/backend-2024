import mongoose from 'mongoose';

// Define the MongoDB connection URL
const mongoURL =   'mongodb+srv://prateekjaswal16:V6FkWCmFbzGwDBjR@backenddb.al1rngv.mongodb.net/backend_SF'

// Set up MongoDB connection
mongoose.connect(mongoURL)

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
export default db;