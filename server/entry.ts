import '#polyfill';
import { Server } from 'http';
import destr from 'destr';
import { handle } from '@nuxt/nitro/dist/runtime/server';
import mongoose from "./db"

const port = (destr(process.env.NUXT_PORT || process.env.PORT) || 3000) as number;
const hostname = process.env.NUXT_HOST || process.env.HOST || 'localhost';

let server: Server;

server = new Server(handle);

console.log(mongoose.connection.readyState === 1 && ":)")

server.listen(port, hostname, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Listening on http://${hostname}:${port}`);
});

export default {}