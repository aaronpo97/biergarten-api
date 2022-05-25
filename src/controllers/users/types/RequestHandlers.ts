import { RequestHandler } from 'express-serve-static-core';

/**
 * Instance of RequestHandler.
 *
 * For requests with the username and password in the request body. Used for logging in.
 */
export type LoginUserRequestHandler = RequestHandler<
  /** Request params */
  {},
  /** Response body */
  {},
  /** Request body */
  { username: string; password: string }
>;

/**
 * Instance of RequestHandler.
 *
 * For requests with the username, email, dateOfBirth, and password in the request body.
 * Used for registering a user.
 */
export type RegisterUserRequestHandler = RequestHandler<
  /** Request params */
  {},
  /** Response body */
  {},
  /** Request body */
  {
    username?: string;
    email?: string;
    dateOfBirth?: string;
    password?: string;
  }
>;

/**
 * Instance of RequestHandler.
 *
 * For requests with the userId in the request body. Used for GET /user/:userId
 */
export type UserRequestHandler = RequestHandler<
  /** Request params */
  { userId: string },
  /** Response body */
  {},
  /** Request body */
  {}
>;

/**
 * Instance of RequestHandler.
 *
 * For the confirm user request. Expects a confirmation token in the request body.
 */
export type confirmUserFn = RequestHandler<
  /** Request params */
  {},
  /** Response body */
  {},
  /** Request body */
  { confirmationToken?: string }
>;
