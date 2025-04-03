const Queue = require("bull");

const requestQueue = new Queue("requestQueue", {
    redis: { 
        family: 0,
        host: process.env.REDIS_HOST, 
        port: process.env.REDIS_PORT, 
        password: process.env.REDIS_PASSWORD 
    },
});

module.exports = requestQueue;