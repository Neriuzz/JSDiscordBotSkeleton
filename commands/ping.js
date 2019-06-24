const Discord = require('discord.js');

exports.execute = async (bot, msg, args) => {
    const m = await msg.channel.send("Ping?")
    await m.edit(`Pong! Bot response time: ${m.createdAt - msg.createdAt}ms API response time: ${bot.ping}ms`);
}

exports.info = {
    aliases: ['ping', 'lag', 'test']
}   