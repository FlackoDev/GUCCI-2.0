require('dotenv').config()

// Funzioni da fare prossimamente: Skip ( stoppa la musica ma non esce il bot (Oppure eventualmente valutare queue)); 

const { Client, GatewayIntentBits, Routes, Collection, ActivityType, Message, Embed  } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('node:fs');
const path = require('node:path');
const token = process.env.TOKEN; 
const clientId = process.env.CLIENTID
const guildId = process.env.GUILDID
const { createAudioPlayer } = require('@discordjs/voice');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers] });
const rest = new REST({ version: '10' }).setToken(token);
const player = createAudioPlayer();
let connection;
let resource;

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Pronto!');
	//Type può essere numerico oppure può essere attribuito una proprietà
	/* 	Attributi: 
		ActivityType.Competing	5
		ActivityType.Listening	2
		ActivityType.Playing	0
		ActivityType.Streaming	1
		ActivityType.Watching	3
	*/
	client.user.setPresence({
		activities: [{ name: `Ad essere il migliore 👌`, type: ActivityType.Playing }],
		status: 'dnd',
	});
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Caricare i comandi dai file
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Aggiornare i comandi slash
(async () => {
	try {
		const commands = [];

		for (const cmd of client.commands.toJSON()) {
			commands.push(cmd.data)
		}

		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

// Aggiungere l'ascolto all'evento     
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, {
			player,
			connection: {
				set: (con) => { connection = con },
				get: () => { return connection }
			},
			resource: {
				set: (res) => { resource = res },
				get: () => { return resource }
			}
		});
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);