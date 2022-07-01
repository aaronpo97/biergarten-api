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
    firstName?: string;
    lastName?: string;
  }
>;

/**
 * Instance of RequestHandler.
 *
 * For requests with the username in the request body. Used for editing a user.
 */
export type EditUsernameRequestHandler = RequestHandler<
  /** Request params */
  { userId: string },
  /** Response body */
  {},
  /** Request body */
  {
    username?: string;
  }
>;

/**
 * Instance of RequestHandler.
 *
 * For requests with the username in the request body. Used for editing a user.
 */
export type EditEmailRequestHandler = RequestHandler<
  /** Request params */
  { userId: string },
  /** Response body */
  {},
  /** Request body */
  {
    email?: string;
  }
>;

/**
 * Instance of RequestHandler.
 *
 * For requests with the userId in the request body. Used for GET, DELETE /user/:userId
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

/**
 * Instance of Request Handler.
 *
 * For a username checker GET route.
 */
export type CheckIfUsernameExistsFn = RequestHandler<{}, {}, {}, { username?: string }>;

/**
 * Instance of Request Handler.
 *
 * For a email checker GET route.
 */
export type CheckIfEmailExistsFn = RequestHandler<{}, {}, {}, { email?: string }>;
