const { SlashCommandBuilder } = require('discord.js');
const { createAudioResource, joinVoiceChannel } = require('@discordjs/voice');
const path = require('node:path');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bouler')
    .setDescription('Lancia un bouuuler ad una persona!')
    .addStringOption(option =>
      option.setName('audio')
        .setDescription('The gif category')
        .setRequired(true)
        .addChoices(
          { name: 'Test', value: 'test.mp3' },
          { name: 'Nigra', value: 'Nigra.mp3' },
        )
    )
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user')
        .setRequired(true)
    ),

  async execute(interaction, {
    player,
    connection,
    resource
  }) {
    const userToBouler = interaction.options.getUser('target')

    // Cerco tutti gli utenti del server
    await interaction.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
      fetchedMembers.map(async (user) => {
        const channel = user.voice.channel;

        // Controllo se l'utente è quello selezionato
        if (user.id == userToBouler.id) {
          if (!channel) {
            await interaction.replay("L'utente non è connesso ad una chat vocale!")
          } else {
            const file = interaction.options.getString('audio')

            // Se non esiste una connessione con il canale vocale la creo
            if (connection.get() == null) {
              connection.set(joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
              }))

              resource.set(createAudioResource(path.join(__dirname, "..", "music", file), {
                inlineVolume: true
              }))
              // Collego il bot al canale vocale
              connection.get().subscribe(player);

              // Avvio la riproduzione del file
              player.play(resource.get());

              await interaction.reply("Riproduco: " + file);
            } else {
              await interaction.reply("Sto già riproducendo in un altro canale vocale!");
            }
          }
        }
      })
    });

    // Elimino il messaggio dopo 7000ms (7s)
    setTimeout(() => interaction.deleteReply(), 1000 * 7)
  },
}; 