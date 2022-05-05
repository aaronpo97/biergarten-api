import Response from './Response';

/**
 * A subclass of Response. Only used in the HTTP response body of successful requests made
 * to the server. Sets the value of success to true, sends a success message, and sends a
 * payload determined by the route the client requested.
 */
export default class SuccessResponse<PayloadType> extends Response {
  payload: PayloadType;

  constructor(message: string, status: number, payload: PayloadType) {
    super({ message, status, success: true });
    this.payload = payload;
  }
}
