const term = require("terminal-kit").terminal;
const ora = require("ora");
const keypress = require("keypress");

const trivia = require("./trivia/trivia.js");

// initialize the counter
let counter = 0;
let score = 0;
let questionCollection = [];

const spinner = ora("loading the data").start();

// fetch questions and answers
const questions = trivia.getTrivia()
.then((res) => {
        questionCollection = res;
        spinner.stop();

        // questionCollection.forEach(async (question) => {
        //     await displayMenu(question);
        // });
        loadGameSession(questionCollection);
        
        //process.exit();
        //displayMenu(questionCollection[counter]);
})
.catch((err) => {
    spinner.stop();
    console.log("Not able to fetch the data !!", err);
});

async function loadGameSession(questionCollection){
    for(const question of questionCollection){
        console.log(question)
        await displayMenu(question);
        console.log("End of question")
    }

    process.exit();
}

async function displayMenu(questionObj){
    term.clear();

    counter = counter + 1;
    term.bgColorRgbHex("#97C8EB");
    term.colorRgbHex("#001011");
    term(`Question No : ${counter} / 10`);
    term.bgDefaultColor();

    term.moveTo(term.width - 9, 1);
    term.colorRgbHex("#001011");
    term.bgColorRgbHex("#97C8EB");
    term("Score : ", score);
    term.bgDefaultColor();

    term("\n\n");

    term.colorRgbHex("#97C8EB")
    term(questionObj.question);
    const options = questionObj.answers;
    term(questionObj.correct_answer);
    term("\n");

    var res = await term.singleColumnMenu(options).promise;

    console.log(res);

    console.log(">>>  PLEASE PRESS [ENTER] TO CONTINUE <<<");

    await require("./utilities/keyHandler").keyPress();
    
}

