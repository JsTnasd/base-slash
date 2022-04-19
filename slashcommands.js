const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { clientId } = require("./config.json")
const commands = []
require('dotenv').config()

fs.readdirSync('./slashcmd').forEach(dir => {
    const subdir = fs.readdirSync(`./slashcmd/${dir}`);
  
    for (let file of subdir) {
      const slash = require(`./slashcmd/${dir}/${file}`);
  
      commands.push(slash.data.toJSON())
    }
  })

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN)

createSlash()

async function createSlash(){
    try{
        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        )
        console.log("Comandos de barra cargados [/]")
    } catch (e) {
        console.error(e)
    }
}