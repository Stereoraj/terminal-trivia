const axios = require("axios");

axios.get("https://opentdb.com/api.php?amount=10")
.then((res) => {
    console.log(res);
})
.catch((err) => {
    console.log("Some error occurred !! : ", err);
});