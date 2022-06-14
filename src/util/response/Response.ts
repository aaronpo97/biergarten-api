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

  constructor(message: string, status: HTTPStatusCodes, success: boolean) {
    this.message = message;
    this.status = status;
    this.success = success;
  }
}
