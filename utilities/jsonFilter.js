module.exports.filterJSON = (initialJSON) => {
    let finalJSON = [];

    initialJSON.map((record) => {
        let answers = [];
        record.incorrect_answers.forEach((incorrectAnswer) => {
            answers.push(UriToAscii(incorrectAnswer));
        });
        answers.push(UriToAscii(record.correct_answer));
        answers = randomizeAnswers(answers);

        finalJSON.push({
            category: UriToAscii(record.category),
            question: UriToAscii(record.question),
            answers: answers,
            difficulty: record.difficulty,
            correct_answer: UriToAscii(record.correct_answer),
        });
    });

    return finalJSON;
}

const randomizeAnswers = (answers) => {
    return require("shuffle-array")(answers);
}

const UriToAscii = (encodedURI) => {
    return decodeURIComponent(encodedURI);
}