import { RequestHandler } from 'express-serve-static-core';

export type MiddlewareFn = RequestHandler<{}, {}, {}>;
export type UserMiddlewareFn = RequestHandler<{ userId: string }, {}, {}>;
export type BeerPostMiddlewareFn = RequestHandler<{ beerId: string }, {}, {}>;
export type BreweryPostMiddlewareFn = RequestHandler<{ breweryId: string }, {}, {}>;
export type BreweryReviewMiddlewareFn = RequestHandler<{
  breweryId: string;
  reviewId: string;
}>;

export type BeerCommentMiddlewareFn = RequestHandler<
  { commentId: string; beerId: string },
  {},
  {}
>;
