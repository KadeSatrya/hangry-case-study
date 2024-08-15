import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsersHandler, getUserByIdHandler, createUserHandler, editUserHandler, deleteUserHandler, RouteHandler } from './handler';

const routeList: { pattern: RegExp, method: String, handler: RouteHandler }[] = [
    {
        pattern: /^\/$/, // For /, only for testing purposes
        method: "GET",
        handler: (req: IncomingMessage, res: ServerResponse) => {
            res.end("API Running");
        }
    },
    {
        pattern: /^\/api\/v0\/users$/, // For /users
        method: "GET",
        handler: getAllUsersHandler
    },
    {
        pattern: /^\/api\/v0\/users\/(\d+)$/, // For /users/{id}
        method: "GET",
        handler: getUserByIdHandler
    },
    {
        pattern: /^\/api\/v0\/users\/create$/, // For /users/create
        method: "POST",
        handler: createUserHandler
    },
    {
        pattern: /^\/api\/v0\/users\/(\d+)$/, // For /users/{id}
        method: "PUT",
        handler: editUserHandler
    },
    {
        pattern: /^\/api\/v0\/users\/(\d+)$/, // For /users/{id}
        method: "PATCH",
        handler: editUserHandler
    },
    {
        pattern: /^\/api\/v0\/users\/(\d+)$/, // For /users/{id}
        method: "DELETE",
        handler: deleteUserHandler
    },
];

export const routeRequest = (req: IncomingMessage, res: ServerResponse) => {
    const url : String = req.url || "";
    
    for (const route of routeList){
        const match = url.match(route.pattern);
        if (match && req.method === route.method){
            const id = match[1];
            route.handler(req, res, id);
            return;
        }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    const body = {
        status: false,
        message: "Not Found",
    };
    res.end(JSON.stringify(body));
}