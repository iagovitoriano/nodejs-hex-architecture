import request from 'supertest';
import faker from 'faker';

import server from '../configs/server';

describe('JSON parser middleware', () => {
  test('Should parse body as JSON', async () => {
    server.post('/test-body-parser', (req, res) => {
      return res.json(req.body);
    });

    const payload = {
      username: faker.internet.userName(),
    };

    const httpResponse = await request(server)
      .post('/test-body-parser')
      .send(payload);

    expect(httpResponse.body).toEqual(payload);
  });
});
