import express from 'express';

import createNewBrewery from '../../controllers/breweries/create/createNewBrewery';
import deleteBreweryById from '../../controllers/breweries/delete/deleteBreweryById';
import getAllBreweries from '../../controllers/breweries/read/getAllBreweries';
import getBreweryById from '../../controllers/breweries/read/getBreweryById';
import updateBreweryById from '../../controllers/breweries/update/updateBreweryById';

const breweryRoutes = express.Router();

breweryRoutes.route('/').get(getAllBreweries).post(createNewBrewery);
breweryRoutes.route('/:breweryId/').get(getBreweryById).delete(deleteBreweryById).put(updateBreweryById);

export default breweryRoutes;
