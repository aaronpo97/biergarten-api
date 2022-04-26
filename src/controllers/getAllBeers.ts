import { NextFunction, Request, Response } from 'express';
import Beer from '../model/Beer';

/**
 *  Business logic for retrieving beers from the database and sending it to the client.
 *
 * @async
 * @param {Request} req The Request object from the express for handling requests.
 * @param {Response} res The Response object from express for handling responses.
 * @param {NextFunction} next The NextFunction object from express.
 * @returns {Promise<void>}
 */
const getAllBeers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
   const allBeers = await Beer.find();
   res.send(allBeers);
};

export default getAllBeers;
