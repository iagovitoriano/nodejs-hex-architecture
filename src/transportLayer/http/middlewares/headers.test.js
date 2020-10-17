import request from 'supertest';

import server from '../configs/server';

describe('Helmet middleware', () => {
  test('Should enable helmet', async () => {
    server.get('/test-helmet', (req, res) => {
      res.send();
    });

    const httpResponse = await request(server).get('/test-helmet');

    expect(httpResponse.headers['x-powered-by']).toBeUndefined();
    expect(httpResponse.headers['content-security-policy']).toBeDefined();
    expect(httpResponse.headers['expect-ct']).toBeDefined();
    expect(httpResponse.headers['referrer-policy']).toBeDefined();
    expect(httpResponse.headers['strict-transport-security']).toBeDefined();
    expect(httpResponse.headers['x-content-type-options']).toBeDefined();
    expect(httpResponse.headers['x-dns-prefetch-control']).toBeDefined();
    expect(httpResponse.headers['x-download-options']).toBeDefined();
    expect(httpResponse.headers['x-frame-options']).toBeDefined();
    expect(
      httpResponse.headers['x-permitted-cross-domain-policies'],
    ).toBeDefined();
    expect(httpResponse.headers['x-xss-protection']).toBeDefined();
  });
});
