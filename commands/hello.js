module.exports = {
    name: "hello",
    desc: "hello reply",
    execute(msg, args) {
        console.log(args);
        msg.reply("hi !");
    }
};
