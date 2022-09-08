const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Esegue il ping!'),
  async execute(interaction) {
    const ms = new Date(Date.now()).getDate() - interaction.createdAt.getDate()

    await interaction.reply('Pong - ' + ms + "ms");
  },
};