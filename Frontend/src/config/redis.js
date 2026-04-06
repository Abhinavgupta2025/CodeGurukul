const { createClient }  = require('redis');

const redisClient = createClient({
    socket: {
        host: 'localhost',
        port: 6379
    }
});

module.exports = redisClient;