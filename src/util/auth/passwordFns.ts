import argon2 from 'argon2';
import { checkIfValidPasswordFn, hashPasswordFn } from './types';

/**
 * Basic helper function that will hash a password.
 *
 * Creates an abstraction over the argon2.hash method, in the case that the manner in
 * which I choose to hash passwords changes.
 */
export const hashPassword: hashPasswordFn = async (password) => argon2.hash(password);

/**
 * Basic helper function that will compare a password with a hash.
 *
 * Creates an abstraction over the argon2.hash function, in the case that the manner in
 * which I choose to hash passwords changes.
 */
export const checkIfValidPassword: checkIfValidPasswordFn = async (hash, password) =>
  argon2.verify(hash, password);
