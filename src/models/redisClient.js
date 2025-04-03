const Redis = require("ioredis");

/*const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});*/

const redisClient = new Redis(/*process.env.REDIS_URL ||*/ "redis://default:ixwihFPUonfrhtPBHbvMnztiOifEoPTv@redis.railway.internal:6379?family=0");

module.exports = redisClient;