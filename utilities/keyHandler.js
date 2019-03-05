module.exports.keyPress = (term) => {
    return new Promise(resolve => {
        const readline = require("readline");
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        // here .once adds the one time listener
        // .once is different than (.on -> adds the listener for whole session )
        process.stdin.once("keypress", (str, key) => {
            if(key.ctrl && key.name === "c"){
                process.exit();
            } else {
                resolve(str);
            }
        });
    });
}