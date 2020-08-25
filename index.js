const Discord = require("discord.js");
const fse = require("fs-extra");
const TOKEN = require("./token"); //private
const client = new Discord.Client();
const PREFIXREPLY = "!";
const clientCommands = new Discord.Collection();

const commands = fse
    .readdirSync("./commands/")
    .filter((item) => item.endsWith(".js"));

commands.forEach((item) => {
    const command = require(`./commands/${item}`);
    clientCommands.set(command.name, command);
});

client.on("ready", () => {
    console.log("jishu-cat is ready for you");
});

client.on("message", (msg) => {
    if (!msg.content.startsWith(PREFIXREPLY)) return;
    let content = msg.content.slice(PREFIXREPLY.length).toLowerCase();
    if (content === "hello") {
        clientCommands.get("hello").execute(msg, content);
    }
});

client.login(TOKEN);
