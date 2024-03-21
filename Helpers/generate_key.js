const cryto = require("node:crypto")
const key1 = cryto.randomBytes(32).toString('hex')
const key2 = cryto.randomBytes(32).toString('hex')
console.log({ key1, key2 });
