/**
 * The super class for both SuccessResponse and ErrorResponse.
 *
 * Used for the HTTP Responses from Express.
 */

import HTTPStatusCodes from '../types/HTTPStatusCodes';

export default class Response {
  message: string;

  status: HTTPStatusCodes;

  success: boolean;

  /**
   * @param message The response message to be sent.
   * @param status A valid HTTP status code.
   * @param success A boolean value representing whether to client's request was successful.
   */
  constructor(message: string, status: HTTPStatusCodes, success: boolean) {
    this.message = message;
    this.status = status;
    this.success = success;
  }
}
