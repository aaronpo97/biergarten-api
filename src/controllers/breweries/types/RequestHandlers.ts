import { RequestHandler, ParamsDictionary } from 'express-serve-static-core';

/**
 * @description
 * Instance of interface RequestHandler.
 * Used for routes that do not have content in the Request or Response body.
 * Mainly used for the GET /breweries route.
 */
export type BreweryRequestHandler = RequestHandler<
  /** Request params */
  ParamsDictionary,
  /** Request body */
  {},
  /** Response body */
  {}
>;

/**
 * @description
 * Instance of interface RequestHandler.
 * Used for routes with the beer id as a param appended to the request object.
 */
export type BreweryByIdRequestHandler = RequestHandler<
  /** Request params */
  { breweryId: string },
  /** Request body */
  {},
  /** Response body */
  {}
>;

/**
 * @description
 * Instance of interface RequestHandler.
 * Used for routes that optionally include an updated Brewery description, name, and/or location.
 * Mainly used for updating the Beer resource.
 */
export type UpdateBreweryRequestHandler = RequestHandler<
  /** Request params */
  { breweryId: string },
  /** Request body */
  {},
  /** Response body */
  { description?: string; name?: string; location?: string }
>;

/**
 * @description
 * Instance of interface RequestHandler.
 * Used for routes involved in the creation of a new Brewery resource.
 */
export type CreateBreweryRequestHandler = RequestHandler<
  /** Request params */
  ParamsDictionary,
  /** Request body */
  {},
  /** Response body */
  { description: string; name: string; location: string }
>;