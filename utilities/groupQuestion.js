module.exports.groupQuestionByDif = (questionArr) => {
    var easyQuestions = [];
    var mediumQuestions = [];
    var hardQuestions = [];

    questionArr.forEach((question) => {
        if(question.difficulty === "easy"){
            easyQuestions.push(question);
        } else if(question.difficulty === "medium"){
            mediumQuestions.push(question);
        } else if(question.difficulty === "hard"){
            hardQuestions.push(question);
        }
    });

    return easyQuestions.concat(mediumQuestions, hardQuestions);
}