import express from 'express';

import createNewBeer from '../../controllers/beers/create/createNewBeer';
import deleteBeerById from '../../controllers/beers/delete/deleteBeerById';
import getAllBeers from '../../controllers/beers/read/getAllBeers';
import getBeerById from '../../controllers/beers/read/getBeerById';
import updateBeerById from '../../controllers/beers/update/updateBeerById';

const beerRoutes = express.Router();

beerRoutes.route('/').get(getAllBeers).post(createNewBeer);
beerRoutes.route('/:beerIdString/').get(getBeerById).put(updateBeerById).delete(deleteBeerById);

export default beerRoutes;
