const Redis = require("ioredis");

/*const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});*/

const redisClient = new Redis(/*process.env.REDIS_URL || */"redis://redis1.railway.internal:6379");

module.exports = redisClient;