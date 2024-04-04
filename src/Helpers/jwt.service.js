const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const client = require("./connect.redis")
const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const secret = process.env.ACCESS_TOKEN;
        const options = {
            expiresIn: '1h'
        }

        jwt.sign(payload, secret, options, function (err, token) {
            if (err) reject(err)
            resolve(token)
        });
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) {
        return next(createHttpError.Unauthorized())
    }

    const bearerToken = req.headers['authorization'].split(" ")[1]
    jwt.verify(bearerToken, process.env.ACCESS_TOKEN, (err, payload) => {
        if (err) {
            if (err.name === "JsonWebTokenError") {
                return next(createHttpError.Unauthorized())
            }
            return next(createHttpError.Unauthorized(err.message))
        }
        req.payload
        next();
    })
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId
        }

        const secret = process.env.REFRESH_TOKE;
        const options = {
            expiresIn: '7d'
        }

        jwt.sign(payload, secret, options, function (err, token) {
            if (err) reject(err)
            client.setEx(userId.toString(), 7 * 24 * 60 * 60, token)
                .then(() => {
                    resolve(token)
                })
                .catch(err => {
                    reject(createHttpError.InternalServerError())
                })

        });
    })
}

const verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKE, (err, payload) => {
            if (err) {
                reject(err)
            }
            client.get(payload.userId)
                .then(refToken => {
                    if (refToken === refreshToken) {
                        resolve(payload)

                    }
                    reject(createHttpError.Unauthorized())
                })
                .catch(err => {
                    reject(createHttpError.InternalServerError())
                })
        })
    })
}


module.exports = {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
}