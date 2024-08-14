import { IncomingMessage, ServerResponse } from 'http';
import { database } from './db';

export type RouteHandler = (req: IncomingMessage, res: ServerResponse, params?: { [key: string]: string }) => void;

export const getAllUsersHandler : RouteHandler = (req, res) => {
    const query = 'SELECT * FROM ??';
}

export const getUserByIdHandler : RouteHandler = (req, res, params) => {
    const query = 'SELECT * FROM ?? WHERE ?? = ??';
}

export const createUserHandler : RouteHandler = (req, res, params) => {
    const query = 'INSERT INTO ?? VALUES (??, ??, ??)';
}

export const editUserHandler : RouteHandler = (req, res, params) => {
    const query = 'UPDATE ?? SET ?? = ??, ?? = ??, ?? = ?? WHERE ?? = ??';
}

export const deleteUserHandler : RouteHandler = (req, res, params) => {
    const query = 'DELETE FROM ?? WHERE ?? = ??';
}