const expect = require("expect");
const groupQuestion = require("../../utilities/groupQuestion");

const testCases = [
    {
        questionArr: [
            {
                question: "Q1",
                difficulty: "medium"
            },
            {
                question: "Q2",
                difficulty: "easy"
            },
            {
                question: "Q3",
                difficulty: "easy"
            },
            {
                question: "Q4",
                difficulty: "hard"
            },
            {
                question: "Q5",
                difficulty: "medium"
            },
            {
                question: "Q6",
                difficulty: "hard"
            },
            {
                question: "Q7",
                difficulty: "easy"
            }
        ]
    },
    {
        questionArr: [
            {
                question: "Q1",
                difficulty: "easy"
            },
            {
                question: "Q2",
                difficulty: "hard"
            },
            {
                question: "Q3",
                difficulty: "easy"
            },
            {
                question: "Q4",
                difficulty: "hard"
            },
            {
                question: "Q5",
                difficulty: "medium"
            },
            {
                question: "Q6",
                difficulty: "easy"
            },
            {
                question: "Q7",
                difficulty: "easy"
            }
        ]
    }
];

const expectedResult = [
    {
        questionArr: [
            {
                question: "Q2",
                difficulty: "easy"
            },
            {
                question: "Q3",
                difficulty: "easy"
            },
            {
                question: "Q7",
                difficulty: "easy"
            },
            {
                question: "Q1",
                difficulty: "medium"
            },
            {
                question: "Q5",
                difficulty: "medium"
            },
            {
                question: "Q4",
                difficulty: "hard"
            },
            {
                question: "Q6",
                difficulty: "hard"
            }
        ]
    },
    {
        questionArr: [
            {
                question: "Q1",
                difficulty: "easy"
            },
            {
                question: "Q3",
                difficulty: "easy"
            },
            {
                question: "Q6",
                difficulty: "easy"
            },
            {
                question: "Q7",
                difficulty: "easy"
            },
            {
                question: "Q5",
                difficulty: "medium"
            },
            {
                question: "Q2",
                difficulty: "hard"
            },
            {
                question: "Q4",
                difficulty: "hard"
            }
        ]
    }
];

describe("Utilities - groupQuestion", () => {
    testCases.forEach((test, index) => {
        it("should arrange the questions in easy, medium and hard order", () => {
            expect(groupQuestion.groupQuestionByDif(test.questionArr)).toEqual(expectedResult[index].questionArr);
        });
    });
});