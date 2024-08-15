import { IncomingMessage, ServerResponse } from 'http';
import { parse, isValid } from 'date-fns';
import { executeQuery } from './db';
const validator = require('validator');


export const getPayload = async (req: IncomingMessage): Promise<any> => {
    return new Promise((resolve, reject) => {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });

        req.on('error', (err) => {
            reject(err);
        });
    });
}

export const validateUserData = async (name: string, email: string, birthdate: string) => {
    if (name === undefined || email === undefined || birthdate === undefined){
        return {status: false, message: "Name, Email, and Date of Birth must not be empty"}
    }

    if (!validator.isEmail(email)){
        return {status: false, message: "Invalid email"};
    }

    const emailQuery = 'SELECT * FROM users WHERE email = ?';
    const sameEmail = await executeQuery(emailQuery, [email]);
    if (sameEmail[0]){
        return {status: false, message: "Email already taken"};
    }

    const parsedDate = parse(birthdate, "dd-mm-yyyy", new Date());
    if (!isValid(parsedDate)){
        return {status: false, message: "Invalid date"};
    }

    return {status: true, message: "Valid data"};
}

export const serverErrorMessage = (res: ServerResponse, message: string, code: number) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    const body = {
        status: false,
        message: message,
    };
    res.end(JSON.stringify(body));
}