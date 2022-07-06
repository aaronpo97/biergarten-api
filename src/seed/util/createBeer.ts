import BeerPost from '../../database/model/BeerPost';
import BeerType from '../../database/model/BeerType';
import BreweryPost from '../../database/model/BreweryPost';
import User from '../../database/model/User';
import logger from '../../util/logger';
import { IRawBeerData } from '../data/types';

const createBeer = async (
  rawBeerData: IRawBeerData,
  brewery: BreweryPost,
  adminUser: User,
) => {
  const { name, typeId, description, abv = 1, ibu = 1 } = rawBeerData;

  const beerToAdd = new BeerPost();

  const beerType = await BeerType.findOneByOrFail({ id: typeId });

  beerToAdd.name = name;
  beerToAdd.type = beerType;
  beerToAdd.description = description;
  beerToAdd.abv = abv;
  beerToAdd.ibu = ibu;
  beerToAdd.brewery = brewery;
  beerToAdd.postedBy = adminUser;
  beerToAdd.createdAt = new Date(Date.now());

  logger.info(`creating ${beerToAdd.name}`);
  return beerToAdd.save();
};

export default createBeer;
