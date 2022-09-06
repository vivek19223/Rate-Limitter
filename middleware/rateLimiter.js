import rateLimiter from '../utils/rateLimiterService.js';
import {ThrottleError} from '../error/errors.js';
const rateLimiterMiddleware = (req, res, next) => {
  const key = `${req.ip}-${req.url}`; // Any values can be a key Ex:(userId, authorizationToken).Currently each individual API is subject to rate-limiting i.e if the MAX API request is 20 per sec, all the API can be called 20 times in a second. This behaviour can be prevented with the choice of key.
  const pointsToConsume = 1; // A conditional logic can sit here and decide the points to leak
  rateLimiter
    .consume (key, pointsToConsume)
    .then (() => {
      next ();
    })
    .catch (() => {
      res.status (429).send (new ThrottleError ());
    });
};

export default rateLimiterMiddleware;
