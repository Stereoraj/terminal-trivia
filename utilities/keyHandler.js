module.exports.keyPress = (term) => {
    return new Promise(resolve => {
        const readline = require("readline");
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);

        process.stdin.on("keypress", (str, key) => {
            if(key.ctrl && key.name === "c"){
                process.exit();
            } else {
                resolve(str);
            }
        });
    });
}