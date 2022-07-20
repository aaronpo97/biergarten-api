export default class AuthConfig {
  private accessToken: string;

  private refreshToken: string;

  private constructor() {
    this.accessToken = '';
    this.refreshToken = '';
  }

  public static initialize(): AuthConfig {
    return new AuthConfig();
  }

  public setTokens(tokens: { accessToken: string; refreshToken: string }): void {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  }

  public getTokens(): {
    'x-access-token': string;
    'x-auth-token': string;
  } {
    if (!(this.accessToken && this.refreshToken)) {
      throw new Error('You must set your tokens before you can use them.');
    }
    return {
      'x-access-token': this.accessToken,
      'x-auth-token': this.refreshToken,
    };
  }
}
