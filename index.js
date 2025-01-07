import { configDotenv } from "dotenv";
import { SocketServer } from "./models/server.js"
configDotenv();
const server = new SocketServer();
server.execute();


