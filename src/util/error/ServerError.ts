import HTTPStatusCodes from '../types/HTTPStatusCodes';

export default class ServerError extends Error {
  status: HTTPStatusCodes;

  constructor(message: string, status: HTTPStatusCodes) {
    super();
    this.message = message;
    this.status = status;
  }
}
