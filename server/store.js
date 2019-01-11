const Redis = require('ioredis')
const { Store } = require('koa-session2')
 
class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis({
            host : '127.0.0.1',
            port : 6379,
            ttl : 60 * 60 * 23,
            db: 0
        });
    }
 
    async get(sid, ctx) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }
 
    async set(session, { sid =  this.getID(24), maxAge = 1000000 } = {}, ctx) {
        try {
            // Use redis set EX to automatically drop expired sessions
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
        } catch (e) {}
        return sid;
    }
 
    async destroy(sid, ctx) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}
 
module.exports = RedisStore;