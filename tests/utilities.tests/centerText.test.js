const expect = require("expect");
const centerText = require("../../utilities/centerText");

// set up the test cases
const testCases = [
    {
        termWidth: 200,
        textMessage: "this is some sample message"
    },
    {
        termWidth: 100,
        textMessage: "center me"
    },{
        termWidth: 50,
        textMessage: "Hi"
    },
    
];

describe("Utilities - centerText", () => {

    testCases.forEach((test) => {
        it(`should return the center cursor to display msg "${test.textMessage}"`, () => {

            const termWidth = test.termWidth;
            const textMessage = test.textMessage;
    
            expect(centerText.getCursorPosition(termWidth, textMessage))
            .toBe((termWidth / 2) - (textMessage.length / 2));
        });
    });

    

});