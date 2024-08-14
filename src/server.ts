require('dotenv').config()
import { createServer, IncomingMessage, ServerResponse } from 'http';
import { routeRequest } from './routes';
const port = process.env.PORT;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    routeRequest(req, res);
});

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})