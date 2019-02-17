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
        displayMenu(questionCollection[counter]);
})
.catch((err) => {
    spinner.stop();
    console.log("Not able to fetch the data !!", err);
});



const displayMenu = (questionObj) => {
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

    term("\n");

    term.singleColumnMenu( options , {
        selectedStyle: term.bgBlue,
        exitOnUnexpectedKey: true
    },
        function( error , response ) {
        if(questionObj.correct_answer === response.selectedText){
            term( '\n' ).eraseLineAfter.green(
                "CORRECT ANSWER !!\n" 
            );
            score  = score + 10;         
        }else{
            term('\n').eraseLineAfter.red("The correct answer is :: ", questionObj.correct_answer);
            term( '\n' ).eraseLineAfter.red("Your total score is ", score);

            process.exit();
        }

        
        if(counter < 10){
            term("\n\n").white(">>> PRESS ENTER FOR NEXT QUESTION <<<");

            term.on("key", (name, matches, data) => {
                if(name === "ENTER"){
                    displayMenu(questionCollection[counter]);
                }
            });
            
        }else{

            process.exit() ;
        }
        
    } ) ;
}
    
