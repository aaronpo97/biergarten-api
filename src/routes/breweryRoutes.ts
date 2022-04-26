import express from 'express';
import getAllBreweries from '../controllers/getAllBreweries';

const breweryRoutes = express.Router();

breweryRoutes.get('/', getAllBreweries);

export default breweryRoutes;
