const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('riprendi')
    .setDescription('Fai ripartire la riproduzione!'),
  async execute(interaction, {
    player,
    connection
  }) {
    // Controllo se il bot è connesso al canale vocale
    if (!connection.get() || connection.get().state.status == "destroyed") {
      await interaction.reply("Non sto riproducendo nulla al momento!")
    } else {
      // Riprendo la riproduzione
      player.unpause();

      await interaction.reply("Unpause")
    }

    // Elimino il messaggio dopo 7000ms (7s)
    setTimeout(() => interaction.deleteReply(), 1000 * 7)
  },
};