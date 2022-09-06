import {RateLimiterMemory, RateLimiterRedis} from 'rate-limiter-flexible';
import Redis from 'ioredis';
// A storeClient can be anything. Like mongo,MySQL or other database client choices
const redisClient = new Redis ({enableOfflineQueue: false});

const rateLimiterMemory = new RateLimiterMemory ({
  points: 5, // 20/5 If there are 4 instances
  duration: 1, // in 1 second
});

const rateLimiter = new RateLimiterRedis ({
  storeClient: redisClient,
  points: 20, // 20 request can be made
  duration: 1, // in 1 second
  inmemoryBlockOnConsumed: 20, // If the user(Id/IP) consume >= 20 points per second
  insuranceLimiter: rateLimiterMemory, // Insurance strategy if the redis server is down
});

export default rateLimiter;
