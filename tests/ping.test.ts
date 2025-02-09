// tests/ping.test.ts
import request from 'supertest';
import { app } from '../src/app';

describe('Ping Route', () => {
  it('Deve responder "pong" em GET /ping', async () => {
    const response = await request(app)
      .get('/ping')
      .expect(200);
    expect(response.text).toBe('pong');
  });
});
