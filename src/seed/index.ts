import { exit } from 'process';

import logger from '../util/logger';

import AppDataSource from '../database/AppDataSource';
import BeerComment from '../database/model/BeerComment';
import BeerPost from '../database/model/BeerPost';
import BreweryPost from '../database/model/BreweryPost';
import BreweryReview from '../database/model/BreweryReview';
import User from '../database/model/User';

import createAdminUser from './dataCreation/createAdminUser';
import createBeer from './dataCreation/createBeer';
import createBeerComment from './dataCreation/createBeerComment';
import createBrewery from './dataCreation/createBrewery';
import createBreweryReview from './dataCreation/createBreweryReview';
import createFakeUser from './dataCreation/createFakeUser';

import generateBeerData from './fakeDataGenerators/generateBeerData';
import generateBeerTypes from './fakeDataGenerators/generateBeerTypes';
import generateBreweryData from './fakeDataGenerators/generateBreweryData';
import generateUserData from './fakeDataGenerators/generateUserData';

import getRandomArrayElement from './seedUtil/getRandomArrayElement';

const userPromises: Promise<User>[] = [];
const beerPromises: Promise<BeerPost>[] = [];
const beerCommentPromises: Promise<BeerComment>[] = [];
const breweryReviewPromises: Promise<BreweryReview>[] = [];
const breweryPromises: Promise<BreweryPost>[] = [];

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

  logger.info('Seeding database. This will take a bit of time.');

  generateUserData(1000).forEach((rawUserData) => {
    userPromises.push(createFakeUser(rawUserData));
  });

  const adminUser = await createAdminUser();
  const allUsers = await Promise.all(userPromises);
  const beerTypes = await generateBeerTypes(adminUser);

  logger.info('Saving all users.');

  generateBreweryData(100).forEach((rawBreweryData) => {
    const randomUser = getRandomArrayElement(allUsers);
    breweryPromises.push(createBrewery(rawBreweryData, randomUser));
  });

  logger.info('Creating and saving all brewery posts...');
  const breweryPosts = await Promise.all(breweryPromises);

  breweryPosts.forEach((breweryPost) => {
    const randomUser = getRandomArrayElement(allUsers);

    breweryReviewPromises.push(createBreweryReview(breweryPost, randomUser));
  });

  generateBeerData(beerTypes, 5000).forEach((rawBeerData) => {
    const randomBrewery = getRandomArrayElement(breweryPosts);
    const randomUser = getRandomArrayElement(allUsers);
    beerPromises.push(createBeer(rawBeerData, randomBrewery, randomUser));
  });

  logger.info('Creating and saving all beer posts...');
  const beerPosts = await Promise.all(beerPromises);

  beerPosts.forEach((beerPost) => {
    for (let i = 0; i < 10; i++) {
      const randomUser = getRandomArrayElement(allUsers);
      beerCommentPromises.push(createBeerComment(beerPost, randomUser));
    }
  });

  breweryPosts.forEach((breweryPost) => {
    for (let i = 0; i < 10; i++) {
      const randomUser = getRandomArrayElement(allUsers);
      breweryReviewPromises.push(createBreweryReview(breweryPost, randomUser));
    }
  });

  logger.info('Creating and saving all beer comments...');
  await Promise.all(beerCommentPromises);

  logger.info('Creating all brewery reviews...');

  await Promise.all(breweryReviewPromises);
};

const startTime = performance.now();
seedDatabase().then(() => {
  const endTime = performance.now();

  logger.info('Database seeded.');
  logger.info(`That took ${endTime - startTime} milliseconds.`);
  exit(0);
});
