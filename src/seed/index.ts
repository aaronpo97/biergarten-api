import { exit } from 'process';

import AppDataSource from '../database/AppDataSource';
import logger from '../util/logger';

import BeerPost from '../database/model/BeerPost';
import generateSeedData from './data/generateSeedData';

import createAdminUser from './util/createAdminUser';
import createBrewery from './util/createBrewery';
import createBeer from './util/createBeer';
import generateUserData from './data/generateUserData';
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
    `--sql 
    TRUNCATE TABLE profile,
                   beer_post,
                   brewery_post,
                   beer_comment,
                   beer_image,
                   "user" CASCADE
    `,
  );

  logger.info('Seeding database. This will take a bit of time...');

  generateUserData(100).forEach((rawUserData) => {
    userPromises.push(createFakeUser(rawUserData));
  });

  const adminUser = await createAdminUser();
  const allUsers = await Promise.all(userPromises);

  generateSeedData(13).forEach((rawBreweryData) => {
    breweryPromises.push(
      (async () => {
        logger.info(`Creating brewery ${rawBreweryData.name}`);
        const newBrewery = await createBrewery(rawBreweryData, adminUser);

        for (let i = 0; i < 30; i++) {
          const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
          breweryReviewPromises.push(createBreweryReview(newBrewery, randomUser));
        }

        rawBreweryData.beers.forEach((beer) => {
          beerPromises.push(createBeer(beer, newBrewery, adminUser));
        });
      })(),
    );
  });

  await Promise.all(breweryPromises);
  await Promise.all([...beerPromises, ...breweryReviewPromises]);
};

seedDatabase().then(() => {
  logger.info('Database seeded.');
  exit(0);
});
