import { RequestHandler } from 'express-serve-static-core';

/**
 * Instance of RequestHandler.
 *
 * Used for create beer image middleware. Takes in the beer post id as a request param.
 */
export type ProcessImageDataFn = RequestHandler<
  /** Request params */
  { beerId: string },
  /** Response body */
  {},
  /** Request body */
  {}
>;
