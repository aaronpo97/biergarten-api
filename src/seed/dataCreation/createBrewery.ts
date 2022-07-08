import BreweryPost from '../../database/model/BreweryPost';
import User from '../../database/model/User';
import { RawBreweryData } from '../fakeDataGenerators/types';

/**
 * Helper function to create a new brewery resource.
 * 
 * @param brewery An object with fake brewery data (i.e. an instance of RawBreweryData).
 * @param postedBy An instance of User to act as the author of the resource to be created.
 */
const createBrewery = async (brewery: RawBreweryData, postedBy: User) => {
  const breweryPost = new BreweryPost();

  breweryPost.name = brewery.name;
  breweryPost.location = brewery.location;
  breweryPost.description = brewery.description;
  breweryPost.postedBy = postedBy;
  breweryPost.createdAt = new Date(Date.now());
  breweryPost.phoneNumber = brewery.phone_number;

  return breweryPost.save();
};

export default createBrewery;
