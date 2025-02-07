const Queue = require("bull");

const requestQueue = new Queue("requestQueue", {
    redis: { 
        host: process.env.REDIS_HOST, 
        port: process.env.REDIS_PORT, 
        password: process.env.REDIS_PASSWORD 
    },
});

module.exports = requestQueue;