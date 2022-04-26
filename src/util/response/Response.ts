export default class Response {
  message: string;

  status: number;

  constructor({ message, status }: { message: string; status: number }) {
    this.message = message;
    this.status = status;
  }
}
