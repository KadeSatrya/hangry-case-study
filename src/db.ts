require('dotenv').config()
import mysql from 'mysql';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export const database = connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log(`Connected to the database ${process.env.DB_NAME} at ${process.env.DB_HOST} with user ${process.env.DB_USER}`);
});