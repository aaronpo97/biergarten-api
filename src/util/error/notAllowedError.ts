import ServerError from './ServerError';

/**
 * An instance of ServerError that is thrown when a user uses an invalid HTTP method.
 * Creates a not allowed message and uses status 405 - Not Allowed.
 */
const notAllowedError = new ServerError('That method is not allowed.', 405);

export default notAllowedError;
