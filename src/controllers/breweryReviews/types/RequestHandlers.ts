import { RequestHandler } from 'express-serve-static-core';

export type getAllBreweryReviewsFn = RequestHandler<
  { breweryId: string },
  {},
  {},
  { page_num?: string; page_size?: string }
>;

export type breweryReviewByIdFn = RequestHandler<{
  reviewId: string;
  breweryId: string;
}>;

export type editBreweryReviewByIdFn = RequestHandler<
  {
    reviewId: string;
    breweryId: string;
  },
  {},
  { reviewBody?: string; rating?: 1 | 2 | 3 | 4 | 5 }
>;

export type createBreweryReviewFn = editBreweryReviewByIdFn;
