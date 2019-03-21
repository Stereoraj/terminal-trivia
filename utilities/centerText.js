module.exports.getCursorPosition = (termWidth, textMessage) => {
    
    // get the length of the text
    const textMessageLength = textMessage.length;

    // calculate the cursor position based on the width of the terminal and 
    // length of the string
    // formula : (center of the terminal) - (half length of the text)

    return ((termWidth / 2) - (textMessageLength / 2));
}