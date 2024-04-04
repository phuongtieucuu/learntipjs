const md5 = require("md5");
module.exports = {
    getSign: (params) => {
        const keyScret = "xxxxxYYYYYY";
        params.v = "v1";
        const sortKeys = [];
        for (const key in params) {
            if (key !== "sign") {
                sortKeys.push(key);
            }
        }
        sortKeys.sort();
        let paramsHolder = "";
        sortKeys.forEach((key) => {
            paramsHolder += key + params[key];
        });

        paramsHolder += keyScret;

        return md5(paramsHolder).toString();
    },
};
