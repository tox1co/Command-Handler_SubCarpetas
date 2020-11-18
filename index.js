require("dotenv").config({ path: __dirname + "/.env" });
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix } = require("./util/config.json");
const client = new Client({ disableMentions: 'everyone' });

client.commands = new Collection();
client.aliases = new Collection();
client.category = readdirSync("./commands/");


["cmd"].forEach(handler => {
    require(`./util/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`${client.user.username} esta en liena!`);
});

client.on("message", async message => {

    if (message.author.bot || !message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd)) 
	   if(command)  command.run(client, message, args)
    
});

client.login(process.env.TOKEN);
