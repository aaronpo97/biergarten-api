import HTTPStatusCodes from '../types/HTTPStatusCodes';
import Response from './Response';

/**
 * A subclass of Response. Only used in the HTTP response body of successful requests made
 * to the server. Sets the value of success to true, sends a success message, and sends a
 * payload determined by the route the client requested.
 */
export default class SuccessResponse<PayloadType> extends Response {
  payload: PayloadType;

  newAccessToken?: string;

  /**
   * @param message The success message to be sent to the client.
   * @param status A valid HTTP status code.
   * @param payload A payload to be sent to the client.
   * @param newAccessToken A regenerated access token if the one sent by the client has
   *   expired. Defaults to undefined.
   */
  constructor(
    message: string,
    status: HTTPStatusCodes,
    payload: PayloadType,
    newAccessToken?: string,
  ) {
    super(message, status, true);
    this.payload = payload;
    this.newAccessToken = newAccessToken;
  }
}
