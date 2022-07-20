import request from 'supertest';

import { beforeAll, describe, expect, test } from '@jest/globals';
import { NIL } from 'uuid';
import AppDataSource from '../../../database/AppDataSource';
import AuthConfig from '../../utils/AuthConfig';
import expressApp from '../../../expressApp';
import isValidUuid from '../../../util/validation/isValidUuid';
import getInvalidId from '../../utils/getInvalidId';

const userOneAuthConfig = AuthConfig.initialize();
const userTwoAuthConfig = AuthConfig.initialize();

let breweryId: string = NIL;

beforeAll(async () => {
  await AppDataSource.initialize();

  const userOneLoginResponse = await request(expressApp)
    .post('/api/users/login')
    .send({ username: 'admin', password: 'password' });
  const userTwoLoginResponse = await request(expressApp)
    .post('/api/users/login')
    .send({ username: 'example', password: 'password' });

  userOneAuthConfig.setTokens({
    accessToken: userOneLoginResponse.body.payload.accessToken as string,
    refreshToken: userOneLoginResponse.body.payload.refreshToken as string,
  });

  userTwoAuthConfig.setTokens({
    accessToken: userTwoLoginResponse.body.payload.accessToken as string,
    refreshToken: userTwoLoginResponse.body.payload.refreshToken as string,
  });
});

describe('GET /api/breweries', () => {
  test('When not provided tokens, server will respond with status code 401.', async () => {
    const response = await request(expressApp).get('/api/breweries').send();
    expect(response.statusCode).toBe(401);
  });

  test('When given the proper credentials, server will respond with status code 200.', async () => {
    const response = await request(expressApp)
      .get('/api/breweries')
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('status');
    expect(response.body).toHaveProperty('payload');
    expect(response.body.payload.brewery_posts).toBeInstanceOf(Array);
    expect(response.status).toEqual(200);
    const { payload } = response.body;

    expect(payload.brewery_posts).toBeInstanceOf(Array);
  });

  test('The server is able to paginate the resources if requested to do so.', async () => {
    const options = {
      page_size: 5,
      page_num: 1,
      paginated: true,
    };

    const response = await request(expressApp)
      .get(
        `/api/breweries?paginated=${options.paginated}&page_size=${options.page_size}&page_num=${options.page_num}`,
      )
      .set(userOneAuthConfig.getTokens());

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('payload');
    expect(response.body.payload).toHaveProperty('page_num', options.page_num);
    expect(response.body.payload).toHaveProperty('page_size', options.page_size);
    expect(response.body.payload).toHaveProperty('brewery_posts');
    expect(response.body.payload.brewery_posts).toBeInstanceOf(Array);
    expect(response.body.payload.brewery_posts).toHaveLength(options.page_size);
  });
});

describe('POST /api/breweries', () => {
  test('When not given the authentication tokens, server responds with 401.', async () => {
    const response = await request(expressApp).post('/api/breweries').send();
    expect(response.statusCode).toBe(401);
  });

  test('When not all params are provided, server responds with 400.', async () => {
    const response = await request(expressApp)
      .post('/api/breweries')
      .set(userOneAuthConfig.getTokens())
      .send();
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message');
  });

  test('When params are provided, server is able to create the brewery_post resource.', async () => {
    const response = await request(expressApp)
      .post('/api/breweries')
      .set(userOneAuthConfig.getTokens())
      .send({
        name: 'Aaron Po Brewing Company',
        description: 'This is a fake brewery for testing!',
        location: '123 Street Name, City, Country',
        phoneNumber: '111-111-1111',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('payload');

    expect(response.body.payload).toHaveProperty('id');

    expect(isValidUuid(response.body.payload.id)).toEqual(true);
    breweryId = response.body.payload.id;
  });
});

describe('GET /api/breweries/:id', () => {
  test('When not provided access and refresh token, server responds with status 401', async () => {
    const response = await request(expressApp).get(`/api/breweries/${breweryId}`).send();

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('success', false);
  });

  test('When given an invalid uuid, server sends status 400.', async () => {
    const response = await request(expressApp)
      .get(`/api/breweries/${getInvalidId()}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('success', false);
  });

  test('When cannot find resource, server sends status 404.', async () => {
    const response = await request(expressApp)
      .get(`/api/breweries/${NIL}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('success', false);
  });

  test('When the resource is found the server sends status 200.', async () => {
    const response = await request(expressApp)
      .get(`/api/breweries/${breweryId}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message');
  });
});

describe('PUT /api/breweries/:id', () => {
  test('When given an invalid id, server sends status 400', async () => {
    const response = await request(expressApp)
      .put(`/api/breweries/${getInvalidId()}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('success', false);
  });

  test('If the current user is not the author of the resource, the server will respond with 403.', async () => {
    const response = await request(expressApp)
      .put(`/api/breweries/${breweryId}`)
      .set(userTwoAuthConfig.getTokens())
      .send();

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message');
  });

  test('If the current user is the author of the resource but does not provide updated params, server will respond with 400.', async () => {
    const response = await request(expressApp)
      .put(`/api/breweries/${breweryId}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message');
  });
});

describe('DELETE /api/breweries/:id', () => {
  test('When the could not find the resource, server sends status 404', async () => {
    const response = await request(expressApp)
      .delete(`/api/breweries/${NIL}`)
      .set(userOneAuthConfig.getTokens());

    expect(response.status).toEqual(404);
    expect(response.body).toHaveProperty('success', false);
  });

  test('When given an invalid id, server sends status 400', async () => {
    const response = await request(expressApp)
      .delete(`/api/breweries/${getInvalidId()}`)
      .set(userOneAuthConfig.getTokens());

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty('success', false);
  });
  test('When not the owner of the resource, server sends status 403.', async () => {
    const response = await request(expressApp)
      .delete(`/api/breweries/${breweryId}`)
      .set(userTwoAuthConfig.getTokens());

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('success', false);
  });

  test('When the author of the brewery_post resource requests deletion, the server responds with status 200.', async () => {
    const response = await request(expressApp)
      .delete(`/api/breweries/${breweryId}`)
      .set(userOneAuthConfig.getTokens());

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);

    const getDeletedResource = await request(expressApp)
      .get(`/api/breweries/${breweryId}`)
      .set(userOneAuthConfig.getTokens());

    expect(getDeletedResource.status).toBe(404);
    expect(getDeletedResource.body).toHaveProperty('success', false);
  });
});
