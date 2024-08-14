import { IncomingMessage, ServerResponse } from 'http';

export type RouteHandler = (req: IncomingMessage, res: ServerResponse, params?: { [key: string]: string }) => void;

export const getAllUsersHandler : RouteHandler = (req, res) => {

}

export const getUserByIdHandler : RouteHandler = (req, res) => {
    
}

export const createUserHandler : RouteHandler = (req, res) => {
    
}

export const editUserHandler : RouteHandler = (req, res) => {
    
}

export const deleteUserHandler : RouteHandler = (req, res) => {
    
}