const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stoppa la riproduzione e fa uscire il bot!'),
  async execute(interaction, {
    player,
    connection
  }) {
    // Controllo se il bot è connesso al canale vocale
    if (!connection.get() || connection.get().state.status == "destroyed") {
      await interaction.reply("Non sto riproducendo nulla al momento!")
    } else {
      // Fermo la riproduzione del file e sconnetto il bot dal canale vocale
      player.stop();
      connection.get().destroy();
      connection.set(null)

      await interaction.reply("Stop")
    }

    // Elimino il messaggio dopo 7000ms (7s)
    setTimeout(() => interaction.deleteReply(), 1000 * 7)
  },
};