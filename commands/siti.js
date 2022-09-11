const { SlashCommandBuilder, userMention, User, Message, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('siti')
		.setDescription('Ti scrive una lista completa di siti dove trovare app e giochi!'),
	async execute(interaction) {
		await interaction.reply("Fatto!")
		const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('SITI')
			.setAuthor({ name: 'Menu', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
			.setDescription('Eccoti un po di siti utili!')
			.addFields(
				// come fare spazi => { name: '\u200B', value: '\u200B' },
				{ name: 'GIOCHI', value: 'https://www.skidrowcodex.net/ \n https://fitgirl-repacks.site/ \n https://game3rb.com/ \n https://igg-games.com/ \n https://cracked-games.org/ \n ', inline: true },
				{ name: 'SOFTWARE', value: 'https://cracked-games.org/ \n https://free4pc.org/ \n', inline: true },
			)
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter({ text: 'Spero ti possa essere futili 💪' });

		await interaction.user.send({ embeds: [exampleEmbed] });
	},
};