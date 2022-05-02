import {
  describe,
  // expect,
  test,
} from '@jest/globals';

//
// import request from 'supertest';
// import app from '../../app';
//

describe('GET /api/beers', () => {
  test.todo('Responds with 200 status code with JSON as content type.');
  test.todo('Responds with SuccessResponse as body.');
  test.todo('Responds with Array<Beer> as body payload.');
  test.todo(
    'If body payload length is not 0, each item of the array is an instance of the class Beer joined with beer.breweryId = brewery.id',
  );
});

describe('GET /api/beers/:id', () => {
  test.todo('When given an invalid id (i.e. not a UUID) it will give a 404 status code.');
  test.todo(
    'When the provided id is valid, but a beer does not exist with the id, a 404 status code is given.',
  );
  test.todo('Response body is of type SuccessResponse or ErrorResponse');
  test.todo('If successful request, status code 200');
  test.todo('If successful request, status code 200');
});

describe('PUT /api/beers/:id', () => {
  test.todo('When given an invalid id (i.e. not a UUID) it will give a 400 status code.');

  test.todo(
    'If user is not authorized to modify resource (i.e. current user is not author), the server will respond with status code ',
  );

  test.todo(
    'When the provided id is valid, but a beer does not exist with the id, a 404 status code is given.',
  );

  test.todo(
    'When the request body is empty or does not have a description, name, abv, ibu, a 400 status code is given, and response is an instance of ErrorResponse',
  );

  test.todo(
    'When given just description, the server responds with a 200 status code, descriptionUpdated in payload = true',
  );

  test.todo(
    'When given just name, the server responds with a 200 status code, nameUpdated value in payload = true',
  );

  test.todo(
    'When given just abv, the server responds with a 200 status code, abvUpdated value in payload = true',
  );

  test.todo(
    'When given just ibu, the server responds with a 200 status code. descriptionUpdated value in payload = true',
  );

  test.todo('Response body is of type SuccessResponse when successful.');
});

describe('DELETE /api/beers/:id', () => {
  test.todo('When given an invalid id (i.e. not a UUID) it will give a 404 status code.');
  test.todo(
    'When the provided id is valid, but a beer does not exist with the id, a 404 status code is given.',
  );

  test.todo(
    'Response is an instance of SuccessResponse with the payload being of type {...beerToDelete, deleted: true}',
  );
  test.todo(
    'After deletion of the resource, a query for a resource with the same uuid will return status code 404, i.e. the resource was actually deleted.',
  );
});
