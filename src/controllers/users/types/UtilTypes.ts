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
