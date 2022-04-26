export default class ServerError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super();
    this.message = message;
    this.status = status;
  }
}
