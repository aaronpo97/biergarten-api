import HTTPStatusCodes from '../types/HTTPStatusCodes';

/** A subclass of the Error object which includes a server status code. */
export default class ServerError extends Error {
  status: HTTPStatusCodes;

  constructor(message: string, status: HTTPStatusCodes) {
    super();
    this.message = message;
    this.status = status;
  }
}
