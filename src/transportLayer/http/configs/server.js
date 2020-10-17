import express from 'express';

import setupMiddlewares from './setupMiddlewares';
import setupRouter from './setupRouter';

const app = express();

setupMiddlewares(app);
setupRouter(app);

export default app;
