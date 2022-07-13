import argon2 from 'argon2';
import { checkIfValidPasswordFn, hashPasswordFn } from './types';

/**
 * Basic helper function that will hash a password.
 *
 * Creates an abstraction over the argon2.hash method, in case the manner in which I
 * choose to hash passwords changes.
 *
 * @param password A plain text password to be hashed.
 * @returns The hashed password.
 */
export const hashPassword: hashPasswordFn = async (password) => argon2.hash(password);

/**
 * Basic helper function that will compare a password with a hash.
 *
 * Creates an abstraction over the argon2.verify function, in the case that the manner in
 * which I choose to hash passwords changes.
 *
 * @param hash A hashed password taken from the database.
 * @param password A plain text password provided by the client.
 * @returns A boolean representation of whether or not the password matches the stored hash.
 */
export const checkIfValidPassword: checkIfValidPasswordFn = async (hash, password) =>
  argon2.verify(hash, password);
