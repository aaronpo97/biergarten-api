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
  { reviewBody?: string; rating?: number }
>;

export type createBreweryReviewFn = editBreweryReviewByIdFn;
