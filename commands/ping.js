const { SlashCommandBuilder, userMention, User } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Esegue il ping!'),
  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Latenza: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
  },
};