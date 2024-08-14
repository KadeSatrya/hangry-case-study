import { IncomingMessage, ServerResponse } from 'http';
import { executeQuery } from './db';
import util from 'util';

export type RouteHandler = (req: IncomingMessage, res: ServerResponse, params?: { [key: string]: string }) => void;

export const getAllUsersHandler : RouteHandler = async (req, res) => {
    const query = 'SELECT * FROM ??';
}

export const getUserByIdHandler : RouteHandler = async (req, res, params) => {
    const query = 'SELECT * FROM ?? WHERE ?? = ??';
}

export const createUserHandler : RouteHandler = async (req, res, params) => {
    const query = 'INSERT INTO ?? (??, ??, ??) VALUES (??, ??, ??)';
}

export const editUserHandler : RouteHandler = async (req, res, params) => {
    const query = 'UPDATE ?? SET ?? = ??, ?? = ??, ?? = ?? WHERE ?? = ??';
}

export const deleteUserHandler : RouteHandler = async (req, res, params) => {
    const query = 'DELETE FROM ?? WHERE ?? = ??';
}