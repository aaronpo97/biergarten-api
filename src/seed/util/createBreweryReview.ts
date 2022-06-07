import User from '../../database/model/User';
import BreweryReview from '../../database/model/BreweryReview';
import BreweryPost from '../../database/model/BreweryPost';

const createBreweryReview = async (
  newBrewery: BreweryPost,
  adminUser: User,
): Promise<BreweryReview> => {
  const breweryReview = new BreweryReview();

  breweryReview.breweryPost = newBrewery;
  breweryReview.rating = 5;
  breweryReview.reviewBody =
    'Quia ad consequatur et doloribus tenetur voluptates non. Fuga odio magni.';
  breweryReview.postedBy = adminUser;
  breweryReview.postedDate = new Date(Date.now());

  return breweryReview.save();
};

export default createBreweryReview;
