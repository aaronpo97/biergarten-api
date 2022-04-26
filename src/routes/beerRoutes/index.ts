import express from 'express';

import getAllBeers from '../../controllers/beers/read/getAllBeers';

const beerRoutes = express.Router();

beerRoutes.get('/', getAllBeers);

export default beerRoutes;
