import express from 'express';

import createNewBeer from '../../controllers/beers/create/createNewBeer';
import getAllBeers from '../../controllers/beers/read/getAllBeers';

const beerRoutes = express.Router();

beerRoutes.route('/').get(getAllBeers).post(createNewBeer);

export default beerRoutes;
