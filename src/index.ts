import express from 'express';

import beerRoutes from './routes/beerRoutes';
import breweryRoutes from './routes/breweryRoutes';

import 'reflect-metadata';
import AppDataSource from './database/AppDataSource';

import logger from './util/logger';

AppDataSource.initialize();

const app = express();
const port = 3000;

app.use('/api/beers/', beerRoutes);
app.use('/api/breweries/', breweryRoutes);

app.listen(port, () => {
  logger.info(`Listening on port: ${port}.`);
});
