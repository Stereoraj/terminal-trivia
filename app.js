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
    console.log(`asking question number ${counter + 1}`);
        counter = counter + 1;

        term.cyan(questionObj.question);
        const options = questionObj.answers;

        term.singleColumnMenu( options , function( error , response ) {
            term( '\n' ).eraseLineAfter.green(
                "#%s selected: %s (%s,%s)\n" ,
                response.selectedIndex ,
                response.selectedText ,
                response.x ,
                response.y
            );
            if(counter < 10){
                displayMenu(questionCollection[counter]);
            }else{
                process.exit() ;
            }
            
        } ) ;
}
    
