const axios = require("axios");

const jsonFilter = require("../utilities/jsonFilter.js");

module.exports.getTrivia = () => {

    return new Promise((resolve, reject) => {
        axios.get("https://opentdb.com/api.php?amount=10")
        .then((res) => {
            resolve(jsonFilter.filterJSON(res.data.results));
        })
        .catch((err) => {
            reject(err);
        });
    });
    
}
