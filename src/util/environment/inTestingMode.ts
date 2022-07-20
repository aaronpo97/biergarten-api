import process from 'process';

/** A boolean value of whether the current NODE_ENV is equal to 'testing'. */
const inTestingMode = process.env.NODE_ENV === 'testing';

export default inTestingMode;
