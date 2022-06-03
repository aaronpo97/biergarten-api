import { Router } from 'express';
import getAllBreweryReviews from '../controllers/brewery-reviews/read/getAllBreweryReviews';
import getBreweryReviewById from '../controllers/brewery-reviews/read/getBreweryReviewById';

/** Route handler for '/api/beers'. */
const breweryReviewRoutes = Router({ mergeParams: true });

breweryReviewRoutes.route('/').get(getAllBreweryReviews);

breweryReviewRoutes.route('/:reviewId').get(getBreweryReviewById);

export default breweryReviewRoutes;
