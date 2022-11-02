import { createClient } from 'redis';
import * as Constants from '../../Commons/Constants/common';
const url = `redis://alice:foobared@awesome.redis.server:${Constants.REDIS_PORT}`
const redis = createClient({
  socket: {
    host: Constants.REDIS_HOST,
    port: Constants.REDIS_PORT,
  },
  password: Constants.REDIS_PASS,
  legacyMode: true // in version 4 require for connect-redis
});

redis.on('error', (err) => {
  // create log here
});

export function getClient() {
  return redis;
}
