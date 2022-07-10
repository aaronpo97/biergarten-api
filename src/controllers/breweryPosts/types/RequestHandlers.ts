import { RequestHandler } from 'express-serve-static-core';

/**
 * Instance of interface RequestHandler.
 *
 * Used for routes that do not have content in the Request or Response body. Mainly used
 * for the GET /breweries route.
 */
export type GetAllBreweriesRequestHandler = RequestHandler<
  /** Request params */
  {},
  /** Request body */
  {},
  /** Response body */
  {},
  /** Request query */
  { page_num?: number; page_size?: number; paginated?: boolean }
>;

/**
 * Instance of interface RequestHandler.
 *
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
 * Instance of interface RequestHandler.
 *
 * Used for routes that optionally include an updated Brewery description, name, and/or
 * location. Mainly used for updating the Beer resource.
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
 * Instance of interface RequestHandler.
 *
 * Used for routes involved in the creation of a new Brewery resource.
 */
export type CreateBreweryRequestHandler = RequestHandler<
  /** Request params */
  {},
  /** Request body */
  {},
  /** Response body */
  { description?: string; name?: string; location?: string; phoneNumber?: string }
>;
