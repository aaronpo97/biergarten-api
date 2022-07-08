// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import BeerType from '../../database/model/BeerType';
import User from '../../database/model/User';
import capitalizeSentence from '../seedUtil/capitalizeSentence';

import beerTypeNames from './beerTypeNames';

const generateBeerTypes = async (adminUser: User) => {
  const typePromises: Promise<BeerType>[] = [];

  beerTypeNames.forEach((type) => {
    const newBeerType = new BeerType();

    newBeerType.name = capitalizeSentence(type);
    newBeerType.description = faker.lorem.paragraph();
    newBeerType.createdAt = new Date(Date.now());
    newBeerType.postedBy = adminUser;

    typePromises.push(newBeerType.save());
  });

  const allBeerTypes = await Promise.all(typePromises);
  return allBeerTypes;
};

export default generateBeerTypes;
