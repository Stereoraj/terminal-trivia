const term = require("terminal-kit").terminal;

const trivia = require("./trivia/trivia.js");

// initialize the counter
let counter = 0;
let score = 0;
let questionCollection = [];

// fetch questions and answers
const questions = trivia.getTrivia()
.then((res) => {
        questionCollection = res;
        displayMenu(questionCollection[counter])
})
.catch((err) => {
    console.log("Error occurred : ", err);
});



const displayMenu = (questionObj) => {
    term.clear();

    counter = counter + 1;
    console.log(`Question No : ${counter + 1} / 10`);

    term.moveTo(term.width - 12, 1);
    console.log("Score : ", score);

    term.cyan(questionObj.question);
    const options = questionObj.answers;

    term.singleColumnMenu( options , function( error , response ) {
        if(questionObj.correct_answer === response.selectedText){
            term( '\n' ).eraseLineAfter.green(
                "#%s selected: %s (%s,%s)\n" ,
                response.selectedIndex ,
                response.selectedText ,
                response.x ,
                response.y
            );
            score  = score + 10;
        }else{
            term( '\n' ).eraseLineAfter.red("Your total score is ", score);

            process.exit();
        }

        
        if(counter < 10){
            displayMenu(questionCollection[counter]);
        }else{
            process.exit() ;
        }
        
    } ) ;
}
    
