const axios = require("axios");

const jsonFilter = require("../utilities/jsonFilter.js");

module.exports.getTrivia = () => {

    return new Promise((resolve, reject) => {
        axios.get("https://opentdb.com/api.php?amount=10&encode=url3986")
        .then((res) => {
            const questionResult = jsonFilter.filterJSON(res.data.results);
            resolve(require("../utilities/groupQuestion").groupQuestionByDif(questionResult));
        })
        .catch((err) => {
            reject(err);
        });
    });
    
}
