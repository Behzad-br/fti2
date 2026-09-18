const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

const seedLocalUsers = async () => {
    const User = require('../models/User');
    const count = await User.countDocuments();
    if (count > 0) return;

    await User.create([
        { name: 'System Admin', email: 'admin@fti.edu.pk', password: 'password123', role: 'admin' },
        { name: 'FTI Employee', email: 'employee@fti.edu.pk', password: 'password123', role: 'employee' },
        { name: 'Test Student', email: 'student@example.com', password: 'password123', role: 'student' },
    ]);
    console.log('Seeded local admin users (admin@fti.edu.pk / password123)');
};

const startMemoryMongo = async () => {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`Local MongoDB connected: ${conn.connection.host}`);
    await seedLocalUsers();
    return conn;
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 4000 });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (atlasError) {
        console.error(`MongoDB Atlas Error: ${atlasError.message}`);
        console.warn('Starting local MongoDB so the backend can run properly...');
        try {
            await mongoose.disconnect().catch(() => {});
            await startMemoryMongo();
        } catch (localError) {
            console.error(`Local MongoDB failed: ${localError.message}`);
            console.warn('Falling back to JSON file storage.');
        }
    }
};

module.exports = connectDB;
