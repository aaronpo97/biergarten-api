// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker/locale/en_CA';
import capitalizeSentence from '../seedUtil/capitalizeSentence';

import { RawBreweryData } from './types';

/**
 * @param breweryCount The number of breweries you wish to generate.
 * @returns {RawBreweryData[]}
 */
const generateBreweryData = (breweryCount: number): RawBreweryData[] => {
  const breweries: RawBreweryData[] = [];

  const nameSuffix: readonly string[] = [
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

    const randomBrewery: RawBreweryData = {
      description,
      name,
      location,
      phone_number,
    };
    breweries.push(randomBrewery);
  }

  return breweries;
};

export default generateBreweryData;
