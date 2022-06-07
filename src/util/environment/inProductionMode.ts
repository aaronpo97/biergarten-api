import process from 'process';

const inProductionMode = process.env.NODE_ENV === 'production';

export default inProductionMode;
