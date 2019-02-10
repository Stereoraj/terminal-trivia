module.exports.filterJSON = (initialJSON) => {
    let finalJSON = [];
    console.log("initial json");

    initialJSON.map((record) => {
        
        let answers = record.incorrect_answers;
        answers.push(record.correct_answer);
        answers = randomizeAnswers(answers);

        finalJSON.push({
            category: record.category,
            question: record.question,
            answers: answers,
            correct_answer: record.correct_answer,
        });
    });

    return finalJSON;
}

const randomizeAnswers = (answers) => {
    return require("shuffle-array")(answers);
}