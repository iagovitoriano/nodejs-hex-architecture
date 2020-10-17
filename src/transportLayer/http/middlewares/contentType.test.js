import request from 'supertest';

import server from '../configs/server';

describe('Content-type middleware', () => {
  test('Should return json content-type as default', async () => {
    server.get('/test-content-type-json', (req, res) => {
      res.send();
    });

    const httpResponse = await request(server).get('/test-content-type-json');

    expect(httpResponse.headers['content-type']).toContain('application/json');
  });

  test('Should return xml content-type if forced', async () => {
    server.get('/test-content-type-xml', (req, res) => {
      res.type('xml');
      res.send();
    });

    const httpResponse = await request(server).get('/test-content-type-xml');

    expect(httpResponse.headers['content-type']).toContain('xml');
  });
});
