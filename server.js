import express from 'express';
import * as dotenv from 'dotenv';
import apisRouter from './router/apis.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config ({override: true});
const app = express ();

//Using rateLimitter as a middleware for all the routes exposed
app.use (rateLimiter);

app.use (apisRouter);

export default app;
