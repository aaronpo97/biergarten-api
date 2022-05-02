import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import app from '../app';

describe('GET /teapot', () => {
  test('Responds with a 418 status code', async () => {
    const response = await request(app).get('/teapot').send();
    expect(response.statusCode).toBe(418);
  });
});
