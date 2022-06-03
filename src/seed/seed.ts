import AppDataSource from '../database/AppDataSource';
import logger from '../util/logger';

import Beer from '../database/model/Beer';

import seedData from './data/seedData';

import createAdminUser from './util/createAdminUser';
import createBrewery from './util/createBrewery';
import createBeer from './util/createBeer';
import fakeUserData from './data/fakeUserData';
import User from '../database/model/User';
import createFakeUser from './util/createFakeUser';
import createBreweryReview from './util/createBreweryReview';

const userPromises: Array<Promise<User>> = [];
const beerPromises: Array<Promise<Beer>> = [];

const seedDB = async () => {
  await AppDataSource.initialize();

  await AppDataSource.manager.query(
    `TRUNCATE TABLE "user", profile, beer, brewery, beer_comment, beer_image CASCADE`,
  );

  logger.info('Seeding database. This will take a bit of time...');

  fakeUserData.forEach((rawUserData) => {
    userPromises.push(createFakeUser(rawUserData));
  });

  const adminUser = await createAdminUser();

  seedData.forEach((brewery) => {
    (async () => {
      const newBrewery = await createBrewery(brewery, adminUser);
      logger.info(`Created ${newBrewery.name}.`);

      await createBreweryReview(newBrewery, adminUser);

      brewery.beers.forEach((beer) => {
        beerPromises.push(createBeer(beer, newBrewery, adminUser));
      });
    })();
  });
  return Promise.all([...beerPromises, ...userPromises]);
};

export default seedDB;
