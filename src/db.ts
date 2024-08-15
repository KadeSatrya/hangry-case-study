import { config } from 'dotenv';
import mysql from 'mysql2/promise';
config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const executeQuery = async (query: string, params?: any[]) => {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(query, params);
    return rows;
};
