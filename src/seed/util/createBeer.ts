import Beer from '../../database/model/Beer';
import Brewery from '../../database/model/Brewery';
import User from '../../database/model/User';
import logger from '../../util/logger';
import { IRawBeerData } from '../data/seedData';

const createBeer = async (
  rawBeerData: IRawBeerData,
  brewery: Brewery,
  adminUser: User,
) => {
  const { name, type, description, abv = 1, ibu = 1 } = rawBeerData;

  const beerToAdd = new Beer();

  beerToAdd.name = name;
  beerToAdd.type = type;
  beerToAdd.description = description;
  beerToAdd.abv = abv;
  beerToAdd.ibu = ibu;
  beerToAdd.brewery = brewery;
  beerToAdd.postedBy = adminUser;

  await beerToAdd.save();

   logger.info(`Creating resource '${beerToAdd.name}' by ${beerToAdd.brewery.name}.`)
  return beerToAdd;
};

export default createBeer;
