import HTTPStatusCodes from '../types/HTTPStatusCodes';
import Response from './Response';

/**
 * A subclass of Response.
 *
 * Only used in the HTTP response body of unsuccessful requests made to the server. Sets
 * the value of success to false, sends an error message as well as the error stack.
 */
export default class ErrorResponse extends Response {
  details?: unknown;

  /**
   * @param message The error message to be sent to the client.
   * @param status A valid HTTP status code.
   * @param stack The error stack from the server. Defaults to undefined.
   */
  constructor(message: string, status: HTTPStatusCodes, stack?: unknown) {
    super(message, status, false);
    this.details = stack;
  }
}
