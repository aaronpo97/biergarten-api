import { CheckIfUsernameExistsFn } from '../types/RequestHandlers';
import { checkIfUsernameTaken } from '../../../util/auth/checkUserFns';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

/**
 * Business logic to check whether a username is already registered in the database. Takes
 * in the username as a request query.
 */
const checkIfUsernameExists: CheckIfUsernameExistsFn = async (req, res, next) => {
  try {
    const { username } = req.query;
    if (!username) {
      throw new ServerError('Username must be provided as a query.', 400);
    }
    const usernameTaken = await checkIfUsernameTaken(username);
    const payload = { username, usernameTaken };
    const successResponse = new SuccessResponse(
      usernameTaken ? 'That username is taken.' : 'That username is available.',
      200,
      payload,
    );
    next(successResponse);
  } catch (err) {
    next(err);
  }
};
export default checkIfUsernameExists;
