const Discord = module.require('discord.js');

module.exports.execute = async (bot, msg, args) => {
    await msg.reply(`Pong! API response time: ${bot.ping}ms`);
}

module.exports.info = {
    name: 'ping',
    aliases: ['lag', 'test']
}