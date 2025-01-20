import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { SocketsConfiguration } from "./sockets.js"
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class SocketServer {
    constructor() {
        this.app = express();;
        this.port = process.env.PORT;

        //Http server

        this.server = createServer(this.app);

        //Configuraciones de socket
        this.io = new Server(this.server, {
            cors: {
                origin: "https://socket-server-basic-pz21.onrender.com",
                methods: ["GET", "POST"]
            }
        });

    }

    middlewares() {
        //Desplegar el directorio publico
        this.app.use(express.static(resolve(__dirname, "../public")));
        this.app.use(cors());
    }
    sockets() {
        new SocketsConfiguration(this.io).socketEvents();
    }

    execute() {
        //Inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        this.sockets();

        //Inicializar server
        this.server.listen(this.port, () => {
            console.log("Server corriendo en puerto:", this.port);
        });
    }
}

export { SocketServer }