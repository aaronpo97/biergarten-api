/* eslint-disable no-unused-vars */
import User from '../../../database/model/User';
/**
 * Typing for the generateAccessToken function.
 *
 * Takes in the user object as a parameter and returns an access token wrapped in a promise.
 */
export type generateAccessTokenFn = (refreshToken: string) => Promise<string>;

/**
 * Typing for the generateRefreshToken function.
 *
 * Takes in the user object as a parameter and returns a refreshToken wrapped in a promise.
 */
export type generateRefreshTokenFn = (user: User) => Promise<string>;

export interface TokenInterface {
  audience: string;
}

/**
 * Typing for the hash password function.
 *
 * Takes in the password as a param, and returns a Promise with the newly hashed password.
 */
export type hashPasswordFn = (password: string) => Promise<string>;
export type checkIfValidPasswordFn = (hash: string, password: string) => Promise<boolean>;

/**
 * Typing for the username checking function.
 *
 * Takes in the username as a param, and returns a Promise with a boolean value of whether
 * or not that the given username is already taken.
 */
export type userExistsCheckFn = (username: string, email: string) => Promise<boolean>;

/**
 * Typing for the username checking function.
 *
 * Takes in the username as a param, and returns a Promise with a boolean value of whether
 * or not that the given username is already taken.
 */
export type UsernameTakenCheckFn = (username: string) => Promise<boolean>;
