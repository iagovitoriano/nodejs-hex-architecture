import headers from '../middlewares/headers';
import cors from '../middlewares/cors';
import jsonParser from '../middlewares/jsonParser';
import contentType from '../middlewares/contentType';

export default app => {
  app.use(headers);
  app.use(cors);
  app.use(jsonParser);
  app.use(contentType);
};
