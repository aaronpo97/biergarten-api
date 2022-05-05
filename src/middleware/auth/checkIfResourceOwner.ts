import { RequestHandler } from 'express';

import logger from '../../util/logger';

const checkIfResourceOwner: RequestHandler<unknown, unknown, unknown> = async (req, res, next) => {
  // @ts-expect-error
  const { currentUser, path, baseUrl } = req;

  logger.info(baseUrl);

  const resourceType = baseUrl;

  next();
};

export default checkIfResourceOwner;
