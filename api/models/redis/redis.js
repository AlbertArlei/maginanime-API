const { createClient } = require('redis');
const client = createClient();

class Redis {
    async main() {
        await client.connect();
        console.log("conected")
    }

    async set(key, value, time) {
        if (time === null) {
            const set = await client.set(key, value);
            return set;
        }
        const set = await client.set(key, value,{EX:time, NX:true});
        return set;
    }

    async get(key) {
        const get = await client.get(key);
        return get;
    }
}

module.exports = Redis;