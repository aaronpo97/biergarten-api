import { RequestHandler } from 'express';
import ServerError from '../util/error/ServerError';

/**
 * Teapot middleware. Will set the status code to 418 and trigger an error response.
 * Mainly an easter egg. Serves no actual purpose for the application other than being
 * nice to have.
 */
const teapotRoute: RequestHandler<null, null, null> = (req, res, next) => {
  next(new ServerError(`I cannot brew coffee, I'm a teapot!`, 418));
};

export default teapotRoute;
