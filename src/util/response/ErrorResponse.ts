import Response from './Response';

/**
 * A subclass of Response.
 *
 * Only used in the HTTP response body of unsuccessful requests made to the server. Sets the value
 * of success to false, sends an error message as well as the error stack.
 */
export default class ErrorResponse extends Response {
  stack?: string;

  constructor(message: string, status: number, stack?: string) {
    super({ message, status, success: false });
    this.stack = stack;
  }
}
