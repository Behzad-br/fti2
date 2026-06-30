const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany(); // Clear existing users

        const users = [
            {
                name: 'System Admin',
                email: 'admin@fti.edu.pk',
                password: 'password123',
                role: 'admin',
            },
            {
                name: 'FTI Employee',
                email: 'employee@fti.edu.pk',
                password: 'password123',
                role: 'employee',
            },
            {
                name: 'Test Student',
                email: 'student@example.com',
                password: 'password123',
                role: 'student',
            }
        ];

        await User.insertMany(users);

        console.log('Data Imported! Users created successfully.');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
