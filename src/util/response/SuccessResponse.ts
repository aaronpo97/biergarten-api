import Response from './Response';

export default class SuccessResponse extends Response {
  success: true;

  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super({ message, status });
    this.success = true;
    this.payload = payload;
  }
}
