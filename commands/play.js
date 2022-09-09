const { SlashCommandBuilder } = require('discord.js');
const { createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const path = require('node:path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Entra e riproduce un audio!')
    .addStringOption(option =>
      option.setName('audio')
        .setDescription('The gif category')
        .setRequired(true)
        .addChoices(
          { name: 'Acqua', value: 'test.mp3' },
          { name: 'Scream', value: 'Nigra.mp3' },
          { name: 'Canzone Gatto', value: 'Gatto.mp3' },
          { name: 'Vaffanchiulo', value: 'Vaffanchiulo.mp3' },
          { name: 'Lucia', value: 'Lucia.mp3' },
          { name: 'Andrea', value: 'euno.mp3' },
          { name: 'Catafratto', value: 'catafratto.mp3' },
          { name: 'Esplodo', value: 'esplodo.mp3' },
          { name: 'Ai se ti piego', value: 'ai-se-ti-piego.mp3' },
          { name: 'Comunismo', value: 'comunismo.mp3' },
        )),
  async execute(interaction, {
    player,
    connection,
    resource
  }) {
    const file = interaction.options.getString('audio')
    const channel = interaction.member.voice.channel

    if (!channel) return await interaction.reply("Devi essere in un canale vocale per usare questo comando!")

    // Se non esiste una connessione con il canale vocale la creo
    if (connection.get() == null) {
      connection.set(joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      }))
    }

    resource.set(createAudioResource(path.join(__dirname, "..", "music", file), {
      inlineVolume: true
    }))
    // Collego il bot al canale vocale
    connection.get().subscribe(player);

    // Avvio la riproduzione del file
    player.play(resource.get());

    await interaction.reply("Riproduco: " + file);

    // Elimino il messaggio dopo 7000ms (7s)
    setTimeout(() => interaction.deleteReply(), 1000 * 7)
  },
};