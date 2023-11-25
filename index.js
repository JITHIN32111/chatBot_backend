import express, { json, urlencoded } from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server as socketIO } from "socket.io";
import http from "http";
import swaggerUI from "swagger-ui-express";
import {dbConnection} from './src/utils/db.js'
import routes from './src/routes/routes.js'
import handleSocketConnection from './src/utils/socketConnection.js'
import swaggerDocument from "./src/utils/swagger.json" assert { type: 'json' };


const app = express();
const server = http.createServer(app);
const PORT=process.env.PORT|| 5000
const io = new socketIO(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  methods: ["GET", "POST"],
  credentials: true,
};

dotenv.config();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));
dbConnection();
handleSocketConnection(io)
const BASE_URL = 'https://chatbotbackend-zsp1.onrender.com';
app.use("/user", async (req, res) => {
  res.send('Hello from /user');
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});







