import { RequestHandler } from 'express-serve-static-core';

/**
 * Instance of RequestHandler.
 *
 * Used for create beer image middleware. Takes in the beer post id as a request param.
 */
export type ProcessNewImagesFn = RequestHandler<
  /** Request params */
  { beerId: string },
  /** Response body */
  {},
  /** Request body */
  {}
>;

export type getAllImagesFn = ProcessNewImagesFn;

/**
 * Instance of RequestHandler
 *
 * Used for read and delete image.
 */
export type ImageByIdFn = RequestHandler<{ beerId: string; imageId: string }>;

/**
 * Instance of RequestHandler
 *
 * Used for edit beer image. Contains an updated beer image caption.
 */

export type EditBeerImageFn = RequestHandler<
  { beerId: string; imageId: string },
  {},
  { updatedCaption: string }
>;
