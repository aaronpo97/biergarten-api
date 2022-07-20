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

let beerId: string = NIL;

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

describe('GET /api/beers', () => {
  test('Responds with status code 401 if the x-access-token and x-auth-token are not provided.', async () => {
    const response = await request(expressApp).get('/api/beers').send();
    expect(response.statusCode).toBe(401);
  });

  test('Responds with SuccessResponse and status 200 if the x-access-token and x-auth-token are provided.', async () => {
    const response = await request(expressApp)
      .get('/api/beers')
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body.payload).toHaveProperty('beer_posts');
  });

  test('Responds with the appropriate page length when requesting the resource to be paginated.', async () => {
    const options = {
      page_size: 5,
      page_num: 1,
      paginated: true,
    };

    const response = await request(expressApp)
      .get(
        `/api/beers?paginated=${options.paginated}&page_size=${options.page_size}&page_num=${options.page_num}`,
      )
      .set(userOneAuthConfig.getTokens());

    expect(response.body).toHaveProperty('payload');
    expect(response.body.payload).toHaveProperty('page_num', options.page_num);
    expect(response.body.payload).toHaveProperty('page_size', options.page_size);
    expect(response.body.payload).toHaveProperty('beer_posts');
    expect(response.body.payload.beer_posts).toHaveLength(options.page_size);
  });
});

describe('POST /api/beers', () => {
  let breweryId: string = '';
  let typeId: string = '';

  beforeAll(async () => {
    const postBreweryResponse = await request(expressApp)
      .post('/api/breweries')
      .set(userOneAuthConfig.getTokens())
      .send({
        name: 'Aaron Po Brewing Company',
        description: 'This is a fake brewery for testing!',
        location: '123 Street Name, City, Country',
        phoneNumber: '111-111-1111',
      });

    const postTypeResponse = await request(expressApp)
      .post('/api/beers/types')
      .set(userOneAuthConfig.getTokens())
      .send({
        name: 'Light Lager',
        description: 'A light, easy drinking beer style. Refreshing with a crisp taste.',
      });

    breweryId = postBreweryResponse.body.payload.id as string;
    typeId = postTypeResponse.body.payload.id as string;
  });

  test('When the x-access-token and x-auth-token are not provided, server responds with status 401.', async () => {
    const postResponse = await request(expressApp).post('/api/beers').send();
    expect(postResponse.statusCode).toBe(401);
    expect(postResponse.body).toHaveProperty('success', false);
  });

  test('When not all parameters are provided, the server responds with a 400 status code.', async () => {
    const postResponse = await request(expressApp)
      .post('/api/beers')
      .set(userOneAuthConfig.getTokens());
    expect(postResponse.statusCode).toBe(400);
    expect(postResponse.body).toHaveProperty('success', false);
  });

  test('When all required parameters are provided, server responds with 201 status code.', async () => {
    const postResponse = await request(expressApp)
      .post('/api/beers')
      .set(userOneAuthConfig.getTokens())
      .send({
        typeId,
        breweryId,
        name: "Aaron Po's Light Lager",
        description: 'A nice, crisp, easy drinking beer.',
        abv: 4,
        ibu: 15,
      });

    expect(postResponse.statusCode).toBe(201);
    expect(postResponse.body).toHaveProperty('success', true);
    expect(postResponse.body).toHaveProperty('payload.id');

    beerId = postResponse.body.payload.id;
  });
});

describe('GET /api/beers/:id', () => {
  test('When given an invalid id (i.e. not a UUID) it will give a 400 status code.', async () => {
    const getResponse = await request(expressApp)
      .get(`/api/beers/${getInvalidId()}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(getResponse.status).toEqual(400);
  });

  test('When given a valid uuid but could not find resource, responds with 404.', async () => {
    const getResponse = await request(expressApp)
      .get(`/api/beers/${NIL}`)
      .set(userOneAuthConfig.getTokens())
      .send();
    expect(getResponse.status).toEqual(404);
  });

  test('Successfully retrieves the newly created beer post.', async () => {
    expect(isValidUuid(beerId)).toEqual(true);

    const getResponse = await request(expressApp)
      .get(`/api/beers/${beerId}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(getResponse.status).toEqual(200);
    expect(getResponse.body).toHaveProperty('payload.id', beerId);
    expect(getResponse.body).toHaveProperty('success', true);
  });
});

describe('PUT /api/beers/:id', () => {
  test('When given an invalid id (i.e. not a UUID) it will give a 400 status code.', async () => {
    const getResponse = await request(expressApp)
      .put(`/api/beers/${getInvalidId()}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(getResponse.status).toEqual(400);
    expect(getResponse.body).toHaveProperty('success', false);
  });

  test('When no tokens are provided, the server responds with 401 status code.', async () => {
    const getResponse = await request(expressApp).put(`/api/beers/${beerId}`).send();

    expect(getResponse.status).toEqual(401);
    expect(getResponse.body).toHaveProperty('success', false);
  });

  test('When given a valid uuid but could not find resource, responds with 404.', async () => {
    const getResponse = await request(expressApp)
      .put(`/api/beers/${NIL}`)
      .set(userOneAuthConfig.getTokens())
      .send();
    expect(getResponse.status).toEqual(404);
    expect(getResponse.body).toHaveProperty('success', false);
  });

  test('If owner of resource, but did not provide params, server will respond with code 400.', async () => {
    const putResponse = await request(expressApp)
      .put(`/api/beers/${beerId}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(putResponse.status).toEqual(400);
    expect(putResponse.body.success).toEqual(false);
  });

  test('If not the owner of the resource, the server will respond with status 403.', async () => {
    const putResponse = await request(expressApp)
      .put(`/api/beers/${beerId}`)
      .set(userTwoAuthConfig.getTokens())
      .send();

    expect(putResponse.status).toEqual(403);
    expect(putResponse.body.success).toEqual(false);
  });

  test('When given proper credentials, and updated params, the server will update the beer_post resource.', async () => {
    const updatedName = 'Updated beer name';
    const updatedDescription = 'Updated description';
    const updatedAbv = 3;
    const updatedIbu = 3;

    const putResponse = await request(expressApp)
      .put(`/api/beers/${beerId}`)
      .set(userOneAuthConfig.getTokens())
      .send({
        name: updatedName,
        description: updatedDescription,
        abv: updatedAbv,
        ibu: updatedIbu,
      });

    expect(putResponse.status).toBe(200);

    const getUpdatedResourceResponse = await request(expressApp)
      .get(`/api/beers/${beerId}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(getUpdatedResourceResponse.body).toHaveProperty('payload');
    expect(getUpdatedResourceResponse.body).toHaveProperty('success', true);

    const { payload } = getUpdatedResourceResponse.body;
    expect(payload).toHaveProperty('id', beerId);
    expect(payload).toHaveProperty('name', updatedName);
    expect(payload).toHaveProperty('description', updatedDescription);
    expect(payload).toHaveProperty('abv', updatedAbv);
    expect(payload).toHaveProperty('ibu', updatedIbu);
  });
});

describe('DELETE /api/beers/:id', () => {
  test('When given an invalid id (i.e. not a UUID) it will give a 400 status code.', async () => {
    const getResponse = await request(expressApp)
      .delete(`/api/beers/${getInvalidId()}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(getResponse.status).toEqual(400);
    expect(getResponse.body).toHaveProperty('success', false);
  });

  test('When no tokens are provided, the server responds with 401 status code.', async () => {
    const getResponse = await request(expressApp).delete(`/api/beers/${beerId}`).send();

    expect(getResponse.status).toEqual(401);
    expect(getResponse.body).toHaveProperty('success', false);
  });

  test('When given a valid uuid but could not find resource, responds with 404.', async () => {
    const getResponse = await request(expressApp)
      .delete(`/api/beers/${NIL}`)
      .set(userOneAuthConfig.getTokens())
      .send();
    expect(getResponse.status).toEqual(404);
    expect(getResponse.body).toHaveProperty('success', false);
  });

  test('If not the owner of the resource, the server will respond with status 403.', async () => {
    const putResponse = await request(expressApp)
      .delete(`/api/beers/${beerId}`)
      .set(userTwoAuthConfig.getTokens())
      .send();

    expect(putResponse.status).toEqual(403);
    expect(putResponse.body).toHaveProperty('success', false);
  });

  test('When given proper credentials, the server will delete the beer_post resource.', async () => {
    const deleteResponse = await request(expressApp)
      .delete(`/api/beers/${beerId}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body).toHaveProperty('success', true);

    const getDeletedResource = await request(expressApp)
      .get(`/api/beers/${beerId}`)
      .set(userOneAuthConfig.getTokens())
      .send();

    expect(getDeletedResource.status).toBe(404);
    expect(getDeletedResource.body).toHaveProperty('success', false);
  });
});
