import { IncomingMessage, ServerResponse } from 'http';
import { executeQuery } from './db';
import { getPayload, validateUserData, serverErrorMessage } from './helper';

export type RouteHandler = (req: IncomingMessage, res: ServerResponse, id?: string) => void;

export const getAllUsersHandler : RouteHandler = async (req, res) => {
    const query = 'SELECT * FROM users';
    const result = await executeQuery(query);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const body = {
        status: true,
        message: "Users data successfully fetched",
        data: result
    };
    res.end(JSON.stringify(body));
}

export const getUserByIdHandler : RouteHandler = async (req, res, id) => {
    const query = 'SELECT * FROM users WHERE id = ??';
    const result = await executeQuery(query, [id]);
    
    if (!result[0]){
        serverErrorMessage(res, "User Not Found", 404);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    const body = {
        status: true,
        message: "User data successfully fetched",
        data: result
    };
    res.end(JSON.stringify(body));
}

export const createUserHandler : RouteHandler = async (req, res, id) => {
    const {name, email, birthdate} = await getPayload(req);
    
    const validation = validateUserData(name, email, birthdate);
    if (!validation){
        serverErrorMessage(res, validation["message"], 400);
    }

    const query = 'INSERT INTO users (name, email, birthdate) VALUES (??, ??, ??)';
    await executeQuery(query, [name, email, birthdate]);

    const resultQuery = 'SELECT * FROM users WHERE id = ??';
    const result = await executeQuery(resultQuery, [id]);

    if (!result[0]){
        serverErrorMessage(res, "Internal Server Error", 500);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    const body = {
        status: true,
        message: "User data successfully added",
        data: result
    };
    res.end(JSON.stringify(body));
}

export const editUserHandler : RouteHandler = async (req, res, id) => {
    const {name, email, birthdate} = await getPayload(req);

    const validation = validateUserData(name, email, birthdate);
    if (!validation){
        serverErrorMessage(res, validation["message"], 400);
    }

    const query = 'UPDATE users SET name = ??, email = ??, date = ?? WHERE birthdate = ??';
    await executeQuery(query, [name, email, birthdate]);

    const resultQuery = 'SELECT * FROM users WHERE id = ??';
    const result = await executeQuery(resultQuery, [id]);
    
    if (!result[0]){
        serverErrorMessage(res, "Internal Server Error", 500);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    const body = {
        status: true,
        message: "User data successfully updated",
        data: result
    };
    res.end(JSON.stringify(body));
}

export const deleteUserHandler : RouteHandler = async (req, res, id) => {
    const query = 'DELETE FROM users WHERE id = ??';
    await executeQuery(query, [id]);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    const body = {
        status: true,
        message: "User data successfully deleted",
    };
    res.end(JSON.stringify(body));
}
