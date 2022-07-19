import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import expressApp from '../expressApp';

describe('GET /teapot', () => {
  test('Responds with a 418 status code', async () => {
    const response = await request(expressApp).get('/api/teapot').send();
    expect(response.statusCode).toBe(418);
  });
});
