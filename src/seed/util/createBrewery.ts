import Brewery from '../../database/model/Brewery';
import BreweryReview from '../../database/model/BreweryReview';
import User from '../../database/model/User';
import { IRawBreweryData } from '../data/types';

const createBrewery = async (brewery: IRawBreweryData, adminUser: User) => {
  const breweryToAdd = new Brewery();

  breweryToAdd.name = brewery.name;
  breweryToAdd.location = brewery.location;
  breweryToAdd.description = brewery.description;
  breweryToAdd.postedBy = adminUser;

  return breweryToAdd.save();
};

export default createBrewery;
