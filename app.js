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
    console.log("Not able to fetch the data !! ", err);
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
    
    // displayMsgFormatted("<<TERMINAL TRIVIA>>");
    // displayMsgFormatted("-------------------------");
    // displayMsgFormatted(`10 on 10 !! Winner Winner Chicken Dinner ....`);

    term.colorRgbHex("#bd3b1b");
    // term.bgColorRgbHex("#b9d870");
    displayMsgFormatted("  ------------------------------- ");
    term("\n");
    displayMsgFormatted("  << TERMINAL TRIVIA >>  ");
    term("\n");
    displayMsgFormatted("  ------------------------------- ");
    term.bgDefaultColor();

    term("\n\n");

    term.colorRgbHex("#d8a800");
    displayMsgFormatted(`10 on 10 !! Winner Winner Chicken Dinner .... \n\n`);
    term.defaultColor();

    process.exit();
}

async function displayMenu(questionObj){
    term.clear();

    counter = counter + 1;
    term.bgColorRgbHex("#DBFF33");
    term.colorRgbHex("#0B3C49");
    term(`  Question No : ${counter} / 10  `);
    term.bgDefaultColor();

    term.moveTo(term.width - 11, 1);
    term.bgColorRgbHex("#DBFF33");
    term.colorRgbHex("#0B3C49");
    term(` Score : ${score} `);
    term.bgDefaultColor();

    term("\n\n");

    // term.colorRgbHex("#FFFDFD");
    term.colorRgbHex("#b9d870");
    term("* ",questionObj.question);
    const options = questionObj.answers;
    // term(questionObj.correct_answer);
    // term(questionObj.difficulty);
    term("\n");
    
    term.bgDefaultColor();
    term.defaultColor();
    term.colorRgbHex("#FFFDFD");
    // term.bgColorRgbHex("#666B6A");
    // term.colorRgbHex("#A0EEC0");
    term.colorRgbHex("#00ff44");

    var res = await term.singleColumnMenu(options).promise;

    //console.log(res);
    //console.log(questionObj);

    term.defaultColor();
    term.colorRgbHex("#fff");
    term("\n\n");

    if(res.selectedText === questionObj.correct_answer){
        term.bgBrightGreen(" Correct Answer !! ");
        score = score + 10;
    }else{
        term.bgColorRgbHex("#ff0000");
        term(" Wrong Answer !!    ");
        term.bgDefaultColor();
        term("\n");
        term.bgBrightBlue(" Correct Answer  -> ").bgBrightGreen(`  ${questionObj.correct_answer}  `);
        term("\n");
        term.bgBrightBlue(` Your Score      -> `).colorRgbHex("#0B3C49").bgBrightYellow(`   ${score}  \n\n`);
        process.exit();
    }
    term("\n\n");
    term.bgYellow(">>>  PLEASE ANY KEY TO CONTINUE <<<");

    await require("./utilities/keyHandler").keyPress();
    
}

const welcomeInstruction = () => {
    term.clear();

    // get the cursor position of the terminal to display message
    // the cursor position such that the message appears in the center
    term.colorRgbHex("#bd3b1b");
    // term.bgColorRgbHex("#b9d870");
    displayMsgFormatted("  ----------------------------------- ");
    term("\n");
    displayMsgFormatted("  WELCOME TO TERMINAL TRIVIA  ");
    term("\n");
    displayMsgFormatted("  ----------------------------------- ");
    term.bgDefaultColor();

    term("\n\n");

    term.colorRgbHex("#d8a800");
    displayMsgFormatted("<< BASIC INSTRUCTION >>");
    term("\n\n");

    term.colorRgbHex("#b9d870");
    displayMsgFormatted(" * YOU WILL BE ASKED 10 QUESTIONS ");
    term("\n");
    displayMsgFormatted(" * USE THE ARROW KEY TO NAVIGATE THE OPTIONS AND PRESS ENTER TO SELECT IT");
    term("\n");
    displayMsgFormatted(" * YOU CAN PLAY THE GAME WHILE YOU GIVE THE CORRECT ANSWER");
    term("\n\n");

    term.colorRgbHex("#ee3b1b");
    displayMsgFormatted(" [[ PRESS ANY KEY TO CONTINUE ]]");
    term("\n");
}

const displayMsgFormatted = (msg) => {
    var cursorPos = require("./utilities/centerText").getCursorPosition(term, msg);
    term.column(cursorPos);
    term(msg);
    //term.nextLine(2);
}

