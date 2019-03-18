const axios = require("axios");

const jsonFilter = require("../utilities/jsonFilter.js");

const API_URL = "https://opentdb.com/api.php?amount=10&encode=url3986";

module.exports.getTrivia = () => {

    return new Promise((resolve, reject) => {
        axios.get(API_URL)
        .then((res) => {
            const questionResult = jsonFilter.filterJSON(res.data.results);
            resolve(require("../utilities/groupQuestion").groupQuestionByDif(questionResult));
        })
        .catch((err) => {
            reject(err);
        });
    });
    
}
