import BreweryPost from '../../database/model/BreweryPost';
import User from '../../database/model/User';
import { IRawBreweryData } from '../data/types';

const createBrewery = async (brewery: IRawBreweryData, adminUser: User) => {
  const breweryToAdd = new BreweryPost();

  breweryToAdd.name = brewery.name;
  breweryToAdd.location = brewery.location;
  breweryToAdd.description = brewery.description;
  breweryToAdd.postedBy = adminUser;
  breweryToAdd.createdAt = new Date(Date.now());

  return breweryToAdd.save();
};

export default createBrewery;
