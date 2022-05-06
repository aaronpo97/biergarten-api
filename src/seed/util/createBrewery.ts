import Brewery from '../../database/model/Brewery';
import User from '../../database/model/User';
import { IRawBreweryData } from '../data/seedData';

const createBrewery = async (brewery: IRawBreweryData, adminUser: User) => {
  const breweryToAdd = new Brewery();

  breweryToAdd.name = brewery.name;
  breweryToAdd.location = brewery.location;
  breweryToAdd.description = brewery.description;
  breweryToAdd.postedBy = adminUser;

  await breweryToAdd.save();
  return breweryToAdd;
};

export default createBrewery;
