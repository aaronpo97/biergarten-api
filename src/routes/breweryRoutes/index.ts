import express from 'express';

import createNewBrewery from '../../controllers/breweries/create/createNewBrewery';
import deleteBreweryById from '../../controllers/breweries/delete/deleteBreweryById';
import getAllBreweries from '../../controllers/breweries/read/getAllBreweries';
import getBreweryById from '../../controllers/breweries/read/getBreweryById';
import updateBreweryById from '../../controllers/breweries/update/updateBreweryById';
import ServerError from '../../util/error/ServerError';

const breweryRoutes = express.Router();

breweryRoutes
  .route('/')
  .get(getAllBreweries)
  .post(createNewBrewery)
  .all((req, res, next) => {
    res.set('Allow', 'GET, POST');
    next(new ServerError('Not allowed', 405));
  });

breweryRoutes
  .route('/:breweryId/')
  .get(getBreweryById)
  .delete(deleteBreweryById)
  .put(updateBreweryById)
  .all((req, res, next) => {
    res.set('Allow', 'GET, DELETE, PUT');
    next(new ServerError('Not allowed', 405));
  });

export default breweryRoutes;
