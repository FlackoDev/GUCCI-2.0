const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pausa')
    .setDescription('Metti in pause la riproduzione!'),
  async execute(interaction, {
    player,
    connection
  }) {
    // Controllo se il bot è connesso al canale vocale
    if (!connection.get() || connection.get().state.status == "destroyed") {
      await interaction.reply("Non sto riproducendo nulla al momento!")
    } else {
      // Pause la riproduzione del file
      player.pause();

      await interaction.reply("Pausa")
    }

    // Elimino il messaggio dopo 7000ms (7s)
    setTimeout(() => interaction.deleteReply(), 1000 * 7)
  },
};