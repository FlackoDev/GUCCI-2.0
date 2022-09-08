const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Modifica il volume di riprodzione!')
    .addStringOption(option =>
      option.setName('audio')
        .setDescription('Volume')
        .setRequired(true)
        .addChoices(
          { name: '10%', value: '0.1' },
          { name: '20%', value: '0.2' },
          { name: '30%', value: '0.3' },
          { name: '40%', value: '0.4' },
          { name: '50%', value: '0.5' },
          { name: '60%', value: '0.6' },
          { name: '70%', value: '0.7' },
          { name: '80%', value: '0.8' },
          { name: '90%', value: '0.9' },
          { name: '100%', value: '1' },
          { name: '200%', value: '2' },
          { name: '500%', value: '5' },
          { name: '1000%', value: '10' },
          { name: '5000%', value: '50' },
          { name: '10000%', value: '100' },
        )),
  async execute(interaction, {
    player,
    connection,
    resource
  }) {
    const vol = interaction.options.getString('audio')

    // Controllo se il bot è connesso al canale vocale
    if (!connection.get() || connection.get().state.status == "destroyed") {
      await interaction.reply("Non sto riproducendo nulla al momento!")
    } else {
      // Modifico il volume
      resource.get().volume.setVolume(parseFloat(vol));

      await interaction.reply("Volume modificato a " + parseFloat(vol) * 100 + "%")
    }

    // Elimino il messaggio dopo 7000ms (7s)
    setTimeout(() => interaction.deleteReply(), 1000 * 7)
  },
};