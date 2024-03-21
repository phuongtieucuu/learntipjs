const redis = require("redis");

const client = redis.createClient(6379);
client.connect()

client.on('error', (err) => console.log('Redis Error', err));
client.on('connect', () => console.log('Redis connect'));
client.on('ready', () => console.log('Redis ready'));

module.exports = client