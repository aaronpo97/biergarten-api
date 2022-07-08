// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import BeerType from '../../database/model/BeerType';
import capitalizeSentence from '../seedUtil/capitalizeSentence';

import { RawBeerData } from './types/index';

const generateBeerData = (beerTypes: BeerType[], beerCount: number) => {
  const beers: RawBeerData[] = [];
  for (let x = 0; x < beerCount + 1; x++) {
    const beerType = beerTypes[Math.floor(Math.random() * beerTypes.length)];
    const beerName = capitalizeSentence(`${faker.lorem.words(2)} ${beerType.name}`);
    const beerDescription = faker.lorem.paragraphs(3);
    const abv = Math.floor(Math.random() * (10 - 3) + 3);
    const ibu = Math.floor(Math.random() * (40 - 5) + 10);

    const randomBeer: RawBeerData = {
      abv,
      ibu,
      name: beerName,
      typeId: beerType.id,
      description: beerDescription,
    };
    beers.push(randomBeer);
  }

  return beers;
};
export default generateBeerData;
