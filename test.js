const discordBotModule = require('./module');
const discordBot = new discordBotModule("serhanbaba");

var config = {
        "token": "ur bot token",
        "prefix": "!",
        "name": "TestBoat",
        "playing": "bu bir selam",
        "owner": ["403225819222245377", "211566381592739851"],
        "readyMessage": "Bot çalışıyor"
};

//console.log(process.env.OPERATION)
if (process.env.OPERATION !== "start" && process.env.OPERATION !== "stop") throw Error("OPERATION start ya da stop olmalı.")
else {
    if (process.env.OPERATION === "start") return discordBot.startBot(config);
    else {
        discordBot.stopBot("bot id");
    }
}
