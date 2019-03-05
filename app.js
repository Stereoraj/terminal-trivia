const term = require("terminal-kit").terminal;
const ora = require("ora");

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
    welcomeInstruction();
    await require("./utilities/keyHandler").keyPress(term);

    for(const question of questionCollection){
        //console.log(question)
        await displayMenu(question);
        //console.log("End of question")
    }

    term.clear();
    
    displayMsgFormatted("<<TERMINAL TRIVIA>>");
    displayMsgFormatted("-------------------------");
    displayMsgFormatted(`10 on 10 !! Winner Winner Chicken Dinner ....`);

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

    term.colorRgbHex("#97C8EB");
    term(questionObj.question);
    const options = questionObj.answers;
    term(questionObj.correct_answer);
    term("\n");

    var res = await term.singleColumnMenu(options).promise;

    //console.log(res);
    //console.log(questionObj);

    if(res.selectedText === questionObj.correct_answer){
        term("Correct Answer");
        score = score + 10;
    }else{
        term("Wrong Answer");
        term("\n");
        term("Correct Answer is : ", questionObj.correct_answer);
        term("\n\n");
        term(`Your score : ${score}`);
        process.exit();
    }
    term("\n");
    term(">>>  PLEASE ANY KEY TO CONTINUE <<<");

    await require("./utilities/keyHandler").keyPress();
    
}

const welcomeInstruction = () => {
    term.clear();

    // get the cursor position of the terminal to display message
    // the cursor position such that the message appears in the center

    displayMsgFormatted("WELCOME TO TERMINAL TRIVIA");
    displayMsgFormatted("<< BASIC INSTRUCTION >>");
    displayMsgFormatted(" * YOU WILL BE ASKED 10 QUESTIONS ");
    displayMsgFormatted(" * USE THE ARROW KEY TO NAVIGATE THE OPTIONS AND PRESS ENTER TO SELECT IT");
    displayMsgFormatted(" * YOU CAN PLAY THE GAME WHILE YOU GIVE THE CORRECT ANSWER");
    displayMsgFormatted(" [[ PRESS ANY KEY TO CONTINUE ]]");
    
}

const displayMsgFormatted = (msg) => {
    var cursorPos = require("./utilities/centerText").getCursorPosition(term, msg);
    term.column(cursorPos);
    term(msg);
    term.nextLine(2);
}

