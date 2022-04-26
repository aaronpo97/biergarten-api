import express from 'express';
import getAllBeers from '../controllers/getAllBeers';

const beerRoutes = express.Router();

beerRoutes.get('/', getAllBeers);

export default beerRoutes;
