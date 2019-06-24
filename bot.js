const Discord = require('discord.js');
const config = require('./bot.config.json'); // Load the config file
const fs = require('fs');
const bot = new  Discord.Client();
bot.commands = new Discord.Collection;

// Load all the commands and map them
fs.readdir("./commands/", (err, files) =>{
    if(err) console.err(err);
  
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if(jsfiles.length <=0){
      console.log("No commands to load!");
      return;
    }
  
    console.log(`loading ${jsfiles.length} command(s)!`);
  
    jsfiles.forEach(f => {
      let props = require(`./commands/${f}`);
      bot.commands.set(props.info.name, props);
      if(props.info.aliases) {
          props.info.aliases.forEach(alias => {
            bot.commands.set(alias, props);
          });
      }
    });
  });

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if(!msg.guild) return; // Ignore messages not from the guild
    if(msg.author.bot) return; // Ignore messages from the bot itself
    if(!msg.content.startsWith(config.prefix)) return; // Ignore messages without prefix


    let messageArray = msg.content.split(' ');
    let command = bot.commands.get(messageArray[0].slice(config.prefix.length));
    let args = messageArray.slice(1);

    if(command) command.execute(bot, msg, args);

});

bot.login(config.token);