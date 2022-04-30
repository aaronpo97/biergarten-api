import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import app from '../app';

describe('GET /teapot', () => {
  test('Responds with a 418 status code', async () => {
    const response = await request(app).get('/teapot').send();
    expect(response.statusCode).toBe(418);
  });
});

describe('GET /api/beers', () => {
  test('Responds with 200 status code with JSON as content type.', async () => {
    const response = await request(app).get('/api/beers/').send();
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
  });
});
