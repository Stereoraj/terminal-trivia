module.exports.getCursorPosition = (term, textMessage) => {

    // get the width of the terminal
    const TERM_WIDTH = term.width;
    
    // get the length of the text
    const textMessageLength = textMessage.length;

    // calculate the cursor position based on the width of the terminal and 
    // length of the string
    // formula : (center of the terminal) - (half length of the text)

    return ((TERM_WIDTH / 2) - (textMessageLength / 2));
}