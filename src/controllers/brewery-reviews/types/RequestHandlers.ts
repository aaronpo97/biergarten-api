import { RequestHandler } from 'express-serve-static-core';

export type getAllBreweryReviewsFn = RequestHandler<
  { breweryId: string },
  {},
  {},
  { page_num?: string; page_size?: string }
>;

export type getBreweryReviewByIdFn = RequestHandler<{
  reviewId: string;
  breweryId: string;
}>;
