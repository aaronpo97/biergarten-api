import { ParamsDictionary, RequestHandler } from 'express-serve-static-core';

/**
 * Instance of interface RequestHandler.
 *
 * Used for routes involved in the creation of a new Beer resource.
 */
export type CreateBeerRequestHandler = RequestHandler<
  /** Request params */
  ParamsDictionary,
  /** Response body */
  {},
  /** Request body */
  {
    name?: string;
    description?: string;
    abv?: number;
    ibu?: number;
    breweryId?: string;
    typeId?: string;
  }
>;

/**
 * Instance of interface RequestHandler.
 *
 * Used for routes with the beer id as a param appended to the request object.
 */
export type BeerByIdRequestHandler = RequestHandler<
  /** Request params */
  { beerId: string },
  /** Response body */
  {},
  /** Request body */
  {}
>;

/**
 * Instance of interface RequestHandler. Used for routes that do not have content in the
 * Request or Response body. Mainly used for the GET /beers route.
 */
export type BeerRequestHandler = RequestHandler<
  /** Request params */
  {},
  /** Response body */
  {},
  /** Request body */
  {},
  /** Request query */
  {
    page_num?: number;
    page_size?: number;
    paginated?: boolean;
    sort?: 'type' | 'name' | 'abv' | 'ibu';
  }
>;

/**
 * Instance of interface RequestHandler. Used for routes that include an updated Beer
 * description, name, abv, and/or ibu. Mainly used for updating the Beer resource.
 */
export type UpdateBeerRequestHandler = RequestHandler<
  /** Request params */
  { beerId: string },
  /** Response body */
  {},
  /** Request body */
  { description?: string; name?: string; abv?: number; ibu?: number }
>;
