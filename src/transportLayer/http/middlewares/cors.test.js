import request from 'supertest';

import server from '../configs/server';

describe('CORS middlewares', () => {
  test('Should enable CORS', async () => {
    server.get('/test-cors', (req, res) => {
      res.send();
    });

    const httpResponse = await request(server).get('/test-cors');

    expect(httpResponse.headers['access-control-allow-origin']).toBe('*');
  });
});
