import { Router } from 'express';
import fastGlob from 'fast-glob';
import path from 'path';

export default app => {
  const routesPath = path.resolve(__dirname, '..', 'routes');
  const router = new Router();

  app.use(router);

  fastGlob
    .sync(`**/src/transportLayer/http/routes/**.js`)
    .forEach(async file => {
      const filename = file.split('/').pop();

      const { default: route } = await import(
        path.resolve(routesPath, filename)
      );

      route(router);
    });
};
