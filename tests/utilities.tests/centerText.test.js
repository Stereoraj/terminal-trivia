const expect = require("expect");
const centerText = require("../../utilities/centerText");

// set up the test cases
const testCasesTruth = [
    {
        termWidth: 200,
        textMessage: "this is some sample message"
    },
    {
        termWidth: 100,
        textMessage: "center me"
    },
    {
        termWidth: 50,
        textMessage: "Hi"
    },
    
];

const truthTestCaseResults = [
    {
        result: 86.5
    },
    {
        result: 45.5
    },
    {
        result: 24
    }
];



describe("Utilities - centerText", () => {

    testCasesTruth.forEach((test, index) => {
        it(`should return the center cursor to display msg "${test.textMessage}"`, () => {

            const termWidth = test.termWidth;
            const textMessage = test.textMessage;
    
            expect(centerText.getCursorPosition(termWidth, textMessage))
            .toEqual(truthTestCaseResults[index].result);
        });
    });

});