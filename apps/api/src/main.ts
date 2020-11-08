import * as express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import routes from './app/routes';
import { json } from 'body-parser';

// Config
dotenv.config();

const port = process.env.port || 3333;
const mongoAddr: string = process.env.mongoAddr || 'mongodb://localhost';
const db: string = process.env.db || 'gateway';

// Setup app
mongoose.connect(`${mongoAddr}/${db}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(json());
app.use('/api/v1', routes);

// Start server
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1/`);
});
server.on('error', console.error);
