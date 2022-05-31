import { RequestHandler } from 'express-serve-static-core';

export type MiddlewareFn = RequestHandler<{}, {}, {}>;
export type BeerPostMiddlewareFn = RequestHandler<{ beerId: string }, {}, {}>;
