import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsersHandler, getUserByIdHandler, createUserHandler, editUserHandler, deleteUserHandler, RouteHandler } from './handler';

const routeList: { pattern: RegExp, method: String, handler: RouteHandler }[] = [
    {
        pattern: /^\/$/, // For /
        method: "GET",
        handler: (req: IncomingMessage, res: ServerResponse) => {
            res.end("API Running");
        }
    },
    {
        pattern: /^\/users\/$/, // For /users/
        method: "GET",
        handler: getAllUsersHandler
    },
    {
        pattern: /^\/users\/(\d+)$/, // For /users/{id}
        method: "GET",
        handler: getUserByIdHandler
    },
    {
        pattern: /^\/users\/create$/, // For /users/create
        method: "POST",
        handler: createUserHandler
    },
    {
        pattern: /^\/users\/$/, // For /users/edit/{id}
        method: "PUT",
        handler: editUserHandler
    },
    {
        pattern: /^\/users\/$/, // For /users/edit/{id}
        method: "PATCH",
        handler: editUserHandler
    },
    {
        pattern: /^\/users\/$/, // For /users/delete/{id}
        method: "DELETE",
        handler: deleteUserHandler
    },
];

export const routeRequest = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url || "";
    
    for (const route of routeList){
        const match = url.match(route.pattern);
        if (match && req.method === route.method){
            const params = {id: match[1]};
            route.handler(req, res, params);
            return;
        }
    }

    res.statusCode = 404;
    res.end();
}