const trivia = require("./trivia/trivia.js");

// initialize the counter
let counter = 0;
let score = 0;

// fetch questions and answers
const questions = trivia.getTrivia()
.then((res) => {
    res.map((res) => {
        console.log(`asking question number ${counter + 1}`);
        console.log(res.question);
        counter = counter + 1;
        console.log("***************");
    });
})
.catch((err) => {
    console.log("Error occurred : ", err);
});


    
