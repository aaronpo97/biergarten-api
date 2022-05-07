import AppDataSource from '../database/AppDataSource';
import logger from '../util/logger';

import Beer from '../database/model/Beer';

import seedData, {  } from './data/seedData';

import createAdminUser from './util/createAdminUser';
import createBrewery from './util/createBrewery';
import createBeer from './util/createBeer';

(async () => {
  await AppDataSource.initialize();
  logger.info('Initialized database.');

  await AppDataSource.manager.query(
    `TRUNCATE TABLE "user", profile, beer, brewery, comment`,
  );

  const adminUser = await createAdminUser();

  seedData.forEach(async (brewery) => {
    const newBrewery = await createBrewery(brewery, adminUser);

    const promises: Array<Promise<Beer>> = [];
    brewery.beers.forEach((beer) => promises.push(createBeer(beer, newBrewery, adminUser)));

    await Promise.all(promises);
  });
})();
