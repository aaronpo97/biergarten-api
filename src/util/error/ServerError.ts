import HTTPStatusCodes from '../types/HTTPStatusCodes';

/** A subclass of the Error object which includes a server status code. */
export default class ServerError extends Error {
  status: HTTPStatusCodes;

  /**
   * @param message The error message to be sent.
   * @param status A valid HTTP status code.
   */
  constructor(message: string, status: HTTPStatusCodes) {
    super();
    this.message = message;
    this.status = status;
  }
}
