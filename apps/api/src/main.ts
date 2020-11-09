import dotenv from 'dotenv';
import app from './app';
import * as mongoose from 'mongoose';


// Config
dotenv.config();

const port = process.env.port || 3333;
const mongoAddr: string = process.env.mongoAddr || 'mongodb://localhost';
const db: string = process.env.db || 'gateway';

mongoose.connect(`${mongoAddr}/${db}`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  
// Start server
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api/v1/`);
});
server.on('error', console.error);
