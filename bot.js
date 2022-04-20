const Discord = require("discord.js")
const client = new Discord.Client({ intents: 32767 })
const fs = require("fs")
require("./slashcommands")


client.once('ready', () => {
	console.log('¡Estoy listo!')
})


client.on("interactionCreate", async(interaction) => {

    if(!interaction.isCommand()) return
    const slashcmds = client.slashcommands.get(interaction.commandName)
            
    if(!slashcmds) return
  
    try {
      await slashcmds.run(client, interaction)
    } catch(e) {
      console.error(e)
    }
    })

    client.slashcommands = new Discord.Collection()

  fs.readdirSync('./slashcmd').forEach(dir => {
    const subdir = fs.readdirSync(`./slashcmd/${dir}`);
  
    for (let file of subdir) {
      const slash = require(`./slashcmd/${dir}/${file}`);
  
      client.slashcommands.set(slash.data.name, slash)
    }
  })


client.login(process.env.TOKEN)
