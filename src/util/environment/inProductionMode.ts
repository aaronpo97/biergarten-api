import process from 'process';

/** A boolean value of whether the current NODE_ENV is equal to 'production'. */
const inProductionMode = process.env.NODE_ENV === 'production';

export default inProductionMode;
