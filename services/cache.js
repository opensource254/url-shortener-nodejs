const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

//create a redis instance client
const client = redis.createClient(6379);
client.hget = util.promisify(client.hget);

// Using redis events
client.on('error', (err) => {
    console.log('Error on redis ', err);
});

//redis modules
module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey));
    },
    addToCache(hashKey, key, result) {
        client.hset(hashKey, key, JSON.stringify(result));
    },
    clearField(hashKey) {
        client.del(hashKey);
    },
    async getFromCache(hashKey, key) {
        const cacheValue = await client.hget(hashKey, key);

        //return  what we found in the cache
        if (cacheValue) {
            console.log(cacheValue);
            const result = JSON.parse(cacheValue);

            return result;
        }
        return null;
    },
};
