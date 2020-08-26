const Discord = require("discord.js");
const fse = require("fs-extra");
const TOKEN = require("./token"); //private
const client = new Discord.Client();
const PREFIXREPLY = "!";

client.commands = new Discord.Collection();

let frqS = 0;
setInterval(() => {
    frqS = 0;
}, 60000);

const commands = fse
    .readdirSync("./commands/")
    .filter((item) => item.endsWith(".js"));

commands.forEach((item) => {
    const command = require(`./commands/${item}`);
    client.commands.set(command.name, command);
});

client.on("ready", () => {
    console.log("jishu-cat is ready for you");
});

client.on("message", (msg) => {
    if (!msg.content.startsWith(PREFIXREPLY)) return;
    let content = msg.content.slice(PREFIXREPLY.length).toLowerCase();
    if (msg.author.username === "Rainy" || msg.author.username === "TrickyPi") {
        frqS++;
    }
    if (frqS === 4) {
        msg.reply("别瞎几把发了,好好上班；");
        return;
    }
    if (content === "hello") {
        client.commands.get("hello").execute(msg, content);
    }
});

client.login(TOKEN);
