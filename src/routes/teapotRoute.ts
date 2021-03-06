import { RequestHandler } from 'express-serve-static-core';
import ServerError from '../util/error/ServerError';

/**
 * Instance of RequestHandler with no request params, no request body, and no response
 * body. Used only for the teapot route.
 */
type TeapotRequestHandler = RequestHandler<
  /** Request params */
  {},
  /** Response body */
  {},
  /** Request body */
  {}
>;

/**
 * Teapot middleware.
 *
 * Will set the status code to 418 and trigger an error response.
 *
 * Mainly an easter egg. Serves no actual purpose for the application other than being nice to have.
 *
 * @returns {never} This middleware function will always throw an error.
 * @throws ServerError with status 418. This occurs 100% of the time the middleware
 *   function is invoked.
 */
const teapotRoute: TeapotRequestHandler = (): never => {
  throw new ServerError(`I cannot brew coffee, I'm a teapot!`, 418);
};

export default teapotRoute;
