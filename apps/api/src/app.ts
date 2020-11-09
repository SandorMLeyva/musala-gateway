import * as express from 'express';
import routes from './app/routes';
import { json } from 'body-parser';

// Setup app

const app = express();

app.use(json());
app.use('/api/v1', routes);

export default app;
