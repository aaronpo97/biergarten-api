// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker/locale/en_CA';
import BeerType from '../../database/model/BeerType';
import User from '../../database/model/User';

import capitalizeSentence from '../util/capitalizeSentence';
import { IRawBeerData, IRawBreweryData } from './types';

const generateSeedData = (breweryCount: number, beerTypes: BeerType[]) => {
  const breweries: IRawBreweryData[] = [];
  const beers: IRawBeerData[] = [];

  type nameSuffixes =
    | 'brewing company'
    | 'brewery'
    | 'brewing cooperative'
    | 'brew house';
  const nameSuffix: readonly nameSuffixes[] = [
    'brewing company',
    'brewery',
    'brewing cooperative',
    'brew house',
  ];

  for (let i = 0; i < breweryCount; i++) {
    const randomSuffix = nameSuffix[Math.floor(Math.random() * nameSuffix.length)];
    const name = capitalizeSentence(`${faker.lorem.words(2)} ${randomSuffix}`);
    const description = faker.lorem.paragraphs(2);
    const location = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.country()}`;
    const phone_number = faker.phone.number('(###)-###-####');

    for (let x = 0; x < Math.random() * 10 + 1; x++) {
      const beerType = beerTypes[Math.floor(Math.random() * beerTypes.length)];
      const beerName = capitalizeSentence(`${faker.lorem.words(2)} ${beerType.name}`);
      const beerDescription = faker.lorem.paragraphs(3);
      const abv = Math.floor(Math.random() * (10 - 3) + 3);
      const ibu = Math.floor(Math.random() * (40 - 5) + 10);

      const randomBeer = {
        abv,
        ibu,
        name: beerName,
        typeId: beerType.id,
        description: beerDescription,
      };
      beers.push(randomBeer);
    }

    const randomBrewery: IRawBreweryData = {
      beers,
      description,
      name,
      location,
      phone_number,
    };
    breweries.push(randomBrewery);
  }

  return breweries;
};

export default generateSeedData;
