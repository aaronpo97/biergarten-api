// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker/locale/en_CA';

import User from '../../database/model/User';
import BreweryReview from '../../database/model/BreweryReview';
import BreweryPost from '../../database/model/BreweryPost';

/**
 * Helper function to create a new brewery review resource.
 * 
 * @param breweryPost An instance of BreweryPost in which the created brewery review will be linked to.
 * @param user An instance of User in which will be the author of the newly created resource.
 * @returns 
 */
const createBreweryReview = async (
  breweryPost: BreweryPost,
  user: User,
): Promise<BreweryReview> => {
  const breweryReview = new BreweryReview();

  breweryReview.breweryPost = breweryPost;
  breweryReview.rating = Math.floor(Math.random() * 5 - 1 + 1) as 1 | 2 | 3 | 4 | 5;
  breweryReview.reviewBody = faker.lorem.paragraph(2);
  breweryReview.postedBy = user;
  breweryReview.createdAt = new Date(Date.now());

  return breweryReview.save();
};

export default createBreweryReview;
