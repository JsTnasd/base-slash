const { SlashCommandBuilder } = require("@discordjs/builders")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping2')
    .setDescription('Saldra el ping'),
    run: async(client, interaction) => {

        interaction.reply({ content: `Pong! ${client.ws.ping}`})

    }
}