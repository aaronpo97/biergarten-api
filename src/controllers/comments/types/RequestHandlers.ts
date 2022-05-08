import { RequestHandler } from 'express-serve-static-core';

export type createNewCommentT = RequestHandler<
  { beerId: string },
  {},
  { comment: string }
>;

export type getAllCommentsT = RequestHandler<{ beerId: string }, {}, {}>;
