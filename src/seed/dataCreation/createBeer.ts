import BeerPost from '../../database/model/BeerPost';
import BeerType from '../../database/model/BeerType';
import BreweryPost from '../../database/model/BreweryPost';
import User from '../../database/model/User';
import { RawBeerData } from '../fakeDataGenerators/types';

/**
 * Helper function to create a new beerPost resource.
 *
 * @param rawBeerData Fake beer data to facilitate the creation of a new beerPost resource.
 * @param breweryPost An instance of BreweryPost to act as the brewery for the beerPost to
 *   be created.
 * @param createdBy An instance of User to act as the author of the resource to be created.
 */
const createBeer = async (
  rawBeerData: RawBeerData,
  breweryPost: BreweryPost,
  createdBy: User,
) => {
  const { name, typeId, description, abv = 1, ibu = 1 } = rawBeerData;

  const beerPost = new BeerPost();

  const beerType = await BeerType.findOneByOrFail({ id: typeId });

  beerPost.name = name;
  beerPost.type = beerType;
  beerPost.description = description;
  beerPost.abv = abv;
  beerPost.ibu = ibu;
  beerPost.brewery = breweryPost;
  beerPost.postedBy = createdBy;
  beerPost.createdAt = new Date(Date.now());

  return beerPost.save();
};

export default createBeer;
