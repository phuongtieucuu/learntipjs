const axios = require("axios");
const express = require("express");
const redis = require("redis");

const app = express();
const redisClient = redis.createClient(6379); // Redis server started at port 6379
const MOCK_API = "https://jsonplaceholder.typicode.com/users/";
redisClient.connect()
// trường hợp truy vấn dữ liệu qua email thông qua database

app.get("/users", (req, res) => {
    const email = req.query.email;

    try {
        axios.get(`${MOCK_API}?email=${email}`).then(function (response) {
            const users = response.data;

            console.log("User successfully retrieved from the API");

            res.status(200).send(users);
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// trường hợp truy vấn dữ liệu qua email thông qua cache

app.get("/cached-users", (req, res) => {
    const email = req.query.email;

    try {
        console.log(1);
        redisClient.get(email).then((data) => {
            console.log(2);

            if (data) {
                console.log("User successfully retrieved from Redis");

                res.status(200).send(JSON.parse(data));
            } else {
                console.log(3);

                axios.get(`${MOCK_API}?email=${email}`).then(function (response) {
                    console.log(4);

                    const users = response.data;
                    redisClient.setEx(email, 600, JSON.stringify(users));

                    console.log("User successfully retrieved from the API");

                    res.status(200).send(users);
                });
            }
        }).catch(err => {
            console.error(err);
            throw err;
        })
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});
