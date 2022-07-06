import { CheckIfEmailExistsFn } from '../types/RequestHandlers';
import { checkIfEmailTaken } from '../../../util/auth/checkUserFns';
import ServerError from '../../../util/error/ServerError';
import SuccessResponse from '../../../util/response/SuccessResponse';

/**
 * An Express controller for a GET route that retrieves information on whether or there
 * already exists a user with the provided email address.
 */
const checkIfEmailExists: CheckIfEmailExistsFn = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      throw new ServerError('Username must be provided as a query.', 400);
    }
    const emailTaken = await checkIfEmailTaken(email);
    const payload = { username: email, emailTaken };
    const successResponse = new SuccessResponse(
      emailTaken ? 'That email is taken.' : 'That email is available.',
      200,
      payload,
    );
    next(successResponse);
  } catch (err) {
    next(err);
  }
};
export default checkIfEmailExists;
