import { RequestHandler } from 'express-serve-static-core';

/**
 * Instance of the request handler interface from express-serve-static-core.
 *
 * Used for routes that take in the beer id as a request param and a new comment as a
 * field in the request body. Used for the creation of new beer comments.
 */
export type createNewCommentT = RequestHandler<
  /** Request params */
  { beerId: string },
  /** Response body */
  {},
  /** Request body */
  { comment?: string; rating?: 1 | 2 | 3 | 4 | 5 }
>;

/**
 * Instance of the request handler interface from express-serve-static-core.
 *
 * Used for routes that take in the beer id as a request param, and optionally a page_num
 * and page_size as part of the request query params.
 */
export type getAllCommentsT = RequestHandler<
  /** Request params */
  { beerId: string },
  /** Response body */
  {},
  /** Request body */
  {},
  /** Request query params */
  { page_num?: string; page_size?: string }
>;

/**
 * Instance of the RequestHandler interface from 'express-serve-static-core'.
 *
 * Takes in the beerId and the commentId as request params. Used for getting a single
 * comment by its id.
 */
export type getCommentByIdT = RequestHandler<
  /** Request params */
  { beerId: string; commentId: string },
  /** Response body */
  {},
  /** Request body */
  {}
>;

/**
 * Instance of Request handler.
 *
 * Takes in the comment id and the comment edit body as part of the request body.
 */
export type editCommentByIdT = RequestHandler<
  /** Request params */
  { commentId: string },
  /** Response body */
  {},
  /** Request body */
  { commentEditBody?: string }
>;
