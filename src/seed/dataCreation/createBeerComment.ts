// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import BeerComment from '../../database/model/BeerComment';
import BeerPost from '../../database/model/BeerPost';
import User from '../../database/model/User';

/**
 * Helper function to create a new beer comment resource.
 *
 * @param beerPost An instance of BeerPost that acts as the beerPost resource which the
 *   comment is being posted on.
 * @param user An instance of User that acts as the author of the beerComment resource to
 *   be created.
 */
const createBeerComment = async (
  beerPost: BeerPost,
  user: User,
): Promise<BeerComment> => {
  const beerComment = new BeerComment();

  beerComment.beerPost = beerPost;
  beerComment.commentBody = faker.lorem.lines();
  beerComment.rating = Math.floor(Math.random() * (5 - 1) + 1) as 1 | 2 | 3 | 4 | 5;
  beerComment.createdAt = new Date(Date.now());
  beerComment.postedBy = user;

  return beerComment.save();
};
export default createBeerComment;
