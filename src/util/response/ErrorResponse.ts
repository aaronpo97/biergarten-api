import Response from './Response';

export default class ErrorResponse extends Response {
  success: boolean;

  stack?: string;

  constructor(message: string, status: number, stack?: string) {
    super({ message, status });
    this.success = false;
    this.stack = stack;
  }
}
