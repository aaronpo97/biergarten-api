/* eslint-disable no-unused-vars */
import User from '../../../database/model/User';
/**
 * Typing for the generateAccessToken function. Takes in the user object
 * as a parameter and returns an access token wrapped in a promise.
 */
export type generateAccessTokenFn = (refreshToken: string) => Promise<string>;

/**
 * Typing for the generateRefreshToken function. Takes in the user object
 * as a parameter and returns a refreshToken wrapped in a promise.
 */
export type generateRefreshTokenFn = (user: User) => Promise<string>;

export interface TokenInterface {
  audience: string;
}
