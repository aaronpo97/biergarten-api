/**
 * @description
 * The super class for both SuccessResponse and ErrorResponse.
 * Used for the HTTP Responses from Express.
 */

export default class Response {
  message: string;

  status: number;

  success: boolean;

  /**
   * Creates an instance of Response.
   * @constructor
   * @param {{ message: string; status: number }} { message, status }
   */
  constructor({ message, status, success }: { message: string; status: number; success: boolean }) {
    this.message = message;
    this.status = status;
    this.success = success;
  }
}
