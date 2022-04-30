import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';

/**
 * @description
 * Instance of interface RequestHandler. Used for routes involved in the creation of a new Beer resource.
 */
export type CreateBeerRequestHandler = RequestHandler<
  ParamsDictionary,
  {},
  {
    name: string;
    description: string;
    abv: number;
    ibu: number;
    breweryId: number;
  }
>;

/**
 * @description
 * Instance of interface RequestHandler. Used for routes with the beer id as a param appended to the request object.
 */
export type BeerByIdRequestHandler = RequestHandler<{ beerIdString: string }, {}, {}>;

/**
 * @description
 * Instance of interface RequestHandler. Used for routes that do not have content in the Request or Response body.
 * Mainly used for the GET /beers route.
 */
export type BeerRequestHandler = RequestHandler<ParamsDictionary, {}, {}>;
