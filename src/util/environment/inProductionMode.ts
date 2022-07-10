import process from 'process';

/** Checks if the NODE_ENV is 'production'. */
const inProductionMode = process.env.NODE_ENV === 'production';

export default inProductionMode;
