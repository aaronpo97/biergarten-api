import { exit } from 'process';

import AppDataSource from '../database/AppDataSource';
import logger from '../util/logger';

import BeerPost from '../database/model/BeerPost';
import seedData from './data/seedData';

import createAdminUser from './util/createAdminUser';
import createBrewery from './util/createBrewery';
import createBeer from './util/createBeer';
import fakeUserData from './data/fakeUserData';
import User from '../database/model/User';
import createFakeUser from './util/createFakeUser';
import createBreweryReview from './util/createBreweryReview';
import BreweryReview from '../database/model/BreweryReview';

const userPromises: Array<Promise<User>> = [];
const beerPromises: Array<Promise<BeerPost>> = [];
const breweryReviewPromises: Array<Promise<BreweryReview>> = [];
const breweryPromises: Array<Promise<void>> = [];

const seedDatabase = async () => {
  await AppDataSource.initialize();

  await AppDataSource.manager.query(
    `TRUNCATE TABLE "user", profile, beer_post, brewery_post, beer_comment, beer_image CASCADE`,
  );

  logger.info('Seeding database. This will take a bit of time...');

  fakeUserData.forEach((rawUserData) => {
    userPromises.push(createFakeUser(rawUserData));
  });

  const adminUser = await createAdminUser();

  seedData.forEach((rawBreweryData) => {
    breweryPromises.push(
      (async () => {
        logger.info(`Creating brewery ${rawBreweryData.name}`);
        const newBrewery = await createBrewery(rawBreweryData, adminUser);

        for (let i = 0; i < 30; i++)
          breweryReviewPromises.push(createBreweryReview(newBrewery, adminUser));

        rawBreweryData.beers.forEach((beer) => {
          beerPromises.push(createBeer(beer, newBrewery, adminUser));
        });
      })(),
    );
  });

  await Promise.all(breweryPromises);
  await Promise.all([...beerPromises, ...userPromises, ...breweryReviewPromises]);
};

seedDatabase().then(() => {
  logger.info('Database seeded.');
  exit(0);
});
