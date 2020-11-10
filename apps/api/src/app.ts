import * as express from 'express';
import routes from './app/routes';
import { json } from 'body-parser';
import cors from 'cors';

// Setup app

const app = express();

app.use(cors())
app.use(json());
app.use('/api/v1', routes);

export default app;
