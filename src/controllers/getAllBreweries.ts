import { NextFunction, Request, Response } from 'express';
import Brewery from '../model/Brewery';

/**
 *  Business logic for retrieving brewery data from the database and sending it to the client.
 *
 * @async
 * @param {Request} req The Request object from the express for handling requests.
 * @param {Response} res The Response object from express for handling responses.
 * @param {NextFunction} next The NextFunction object from express.
 * @returns {Promise<void>}
 */
const getAllBreweries = async (req: Request, res: Response, next: NextFunction) => {
   const allBreweries = await Brewery.find();
   res.send(allBreweries);
};

export default getAllBreweries;
