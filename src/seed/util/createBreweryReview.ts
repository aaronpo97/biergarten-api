// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker/locale/en_CA';

import User from '../../database/model/User';
import BreweryReview from '../../database/model/BreweryReview';
import BreweryPost from '../../database/model/BreweryPost';

const createBreweryReview = async (
  newBrewery: BreweryPost,
  user: User,
): Promise<BreweryReview> => {
  const breweryReview = new BreweryReview();

  breweryReview.breweryPost = newBrewery;
  breweryReview.rating = Math.floor(Math.random() * 5 - 1 + 1) as 1 | 2 | 3 | 4 | 5;
  breweryReview.reviewBody = faker.lorem.paragraph(2);
  breweryReview.postedBy = user;
  breweryReview.createdAt = new Date(Date.now());

  return breweryReview.save();
};

export default createBreweryReview;
