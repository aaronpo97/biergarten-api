// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker/locale/en_CA';

import capitalizeSentence from '../util/capitalizeSentence';
import { IRawBeerData, IRawBreweryData } from './types';

const generateSeedData = (breweryCount: number) => {
  const breweries: IRawBreweryData[] = [];
  const beers: IRawBeerData[] = [];

  type BeerTypes = 'stout' | 'porter' | 'cream ale' | 'lager' | 'IPA' | 'amber ale';
  const beerTypes: BeerTypes[] = [
    'stout',
    'porter',
    'cream ale',
    'lager',
    'IPA',
    'amber ale',
  ];

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
      const beerName = capitalizeSentence(`${faker.lorem.words(2)} ${beerType}`);
      const beerDescription = faker.lorem.paragraphs(3);
      const abv = Math.floor(Math.random() * (10 - 3) + 3);
      const ibu = Math.floor(Math.random() * (40 - 5) + 10);

      const randomBeer = {
        abv,
        ibu,
        name: beerName,
        type: beerType,
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
