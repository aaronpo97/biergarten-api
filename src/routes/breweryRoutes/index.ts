import express from 'express';
import createNewBrewery from '../../controllers/breweries/create/createNewBrewery';

import getAllBreweries from '../../controllers/breweries/read/getAllBreweries';

const breweryRoutes = express.Router();

breweryRoutes.get('/', getAllBreweries).post('/', createNewBrewery);

export default breweryRoutes;
