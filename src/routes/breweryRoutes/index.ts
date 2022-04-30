import express from 'express';

import createNewBrewery from '../../controllers/breweries/create/createNewBrewery';
import getAllBreweries from '../../controllers/breweries/read/getAllBreweries';
import getBreweryById from '../../controllers/breweries/read/getBreweryById';

const breweryRoutes = express.Router();

breweryRoutes.route('/').get(getAllBreweries).post(createNewBrewery);
breweryRoutes.route('/:breweryIdString/').get(getBreweryById);

export default breweryRoutes;
