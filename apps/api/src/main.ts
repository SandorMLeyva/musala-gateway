import * as express from 'express';
// import { Message } from '@gateway/api-interfaces';
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./app/routes"

// Config
dotenv.config();

const port = process.env.port || 3333;
const mongoAddr: string = process.env.mongoAddr || "mongodb://localhost";
const db: string = process.env.db || "gateway";

// Setup app
mongoose.connect(`${mongoAddr}/${db}`, { useNewUrlParser: true });
const app = express();

// const greeting: Message = { message: 'Welcome to api!' };

app.use("/apiv1", routes);

// Start server
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/apiv1` );
});
server.on('error', console.error);
