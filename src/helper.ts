import { IncomingMessage, ServerResponse } from 'http';
import { parse, isValid } from 'date-fns';


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

export const validateUserData = (name: string, email: string, birthdate: string) => {
    if (!name || !email || !birthdate){
        return {status: false, message: "Name, Email, and Date of Birth must not be empty"}
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)){
        return {status: false, message: "Invalid email"}
    }

    const parsedDate = parse(birthdate, "dd-mm-yyyy", new Date());
    if (!isValid(parsedDate)){
        return {status: false, message: "Invalid date"}
    }

    return {status: true, message: "Valid data"}
}

export const serverErrorMessage = (res: ServerResponse, message: string, code: number) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    const body = {
        status: false,
        message: message,
    };
    res.end(JSON.stringify(body));
}