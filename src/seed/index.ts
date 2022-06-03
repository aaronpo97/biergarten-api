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
import BreweryReview from '../database/model/BreweryReview';

const userPromises: Array<Promise<User>> = [];
const beerPromises: Array<Promise<Beer>> = [];

(async () => {
  await AppDataSource.initialize();

  await AppDataSource.manager.query(
    `TRUNCATE TABLE "user", profile, beer, brewery, beer_comment, beer_image CASCADE`,
  );

  logger.info(
    'Initialized database.\nSeeding database. This will take a bit of time.\nCreating resources...',
  );

  fakeUserData.forEach((rawUserData) => {
    userPromises.push(createFakeUser(rawUserData));
  });

  const adminUser = await createAdminUser();

  seedData.forEach((brewery) => {
    (async () => {
      const newBrewery = await createBrewery(brewery, adminUser);
      logger.info(`Created ${newBrewery.name}.`);

      const breweryReview = new BreweryReview();

      breweryReview.breweryPost = newBrewery;
      breweryReview.rating = 5;
      breweryReview.reviewBody =
        'Quia ad consequatur et doloribus tenetur voluptates non. Fuga odio magni.';
      breweryReview.postedBy = adminUser;
      breweryReview.postedDate = new Date(Date.now());

      await breweryReview.save();

      console.log(breweryReview);

      brewery.beers.forEach((beer) => {
        beerPromises.push(createBeer(beer, newBrewery, adminUser));
      });
    })();
  });
  await Promise.all([...beerPromises, ...userPromises]);
})();
