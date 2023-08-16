import './commands'
require('dotenv').config();
const { DISCORD_TOKEN, CLIENT_ID, prefix } = process.env;

// const connection = require("connection.ts")
const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});







/*
       ------------------- functions() -----------------------
*/


//  Это будет занос в БД
// async function showChoice(interaction, gameName){
//   await interaction.reply( `${interaction.user.username}, ты выбрал(а) ${gameName}` );
// }

async function aboutMe(interaction){
  const interactionAuthor = interaction.user;
  
  const aboutMeEmbed = new Discord.EmbedBuilder()
  .setTitle('TempTitle')
  .setColor(0x2ecc71)
  .setDescription('Напиши в чат пару слов о себе')

  await interaction.reply({ embeds: [aboutMeEmbed] });


  // Не работает
  client.on('message', async message => {
    const messageAuthor = message.user;
    if(message.content === "а"){
      await message.channel.send("ага")
    }
    else{
      await message.channel.send("не ага")
    }
  })
}

async function registration(interaction){
  // showChoice(interaction, gameName)
  aboutMe(interaction)
}







client.on('interactionCreate', async interaction => {

/*
       ------------------- isChatInputCommand -----------------------
*/

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	} 
  else if (interaction.commandName === 'beep') {
		await interaction.reply('Boop!');
	}
  else if (interaction.commandName === 'test') {
    const message = interaction.options.data
    console.log(message)
	}
  else if (interaction.commandName === 'nickname') {
		await interaction.reply(`Его имя ${interaction.user.username}`);
	}
  else if (interaction.commandName === 'start') {
		const welcomEmbed = new Discord.EmbedBuilder()
      .setTitle(`Приветствую, ${interaction.user.username}`)
      .setColor(0x2ecc71)
      .setDescription('Выбери игру, в которую собираешься поиграть')
      .addFields(
        { name: '\u200B', value: '1️⃣', inline: true },
        { name: '\u200B', value: 'Counter-Strike: Global Offensive', inline: true  },
        { name: '\u200B', value: '\u200B', inline: true  },
        { name: '\u200B', value: '2️⃣', inline: true },
        { name: '\u200B', value: 'Dota 2', inline: true  },
        { name: '\u200B', value: '\u200B', inline: true  },
        { name: '\u200B', value: '3️⃣', inline: true },
        { name: '\u200B', value: 'League of Legends', inline: true  },
        { name: '\u200B', value: '\u200B', inline: true  },
      )

/*
       ------------------- Buttons -----------------------
*/
    
    const buttons = new Discord.ActionRowBuilder()
      .addComponents(
        new Discord.ButtonBuilder()
          .setCustomId('csgo')
          .setLabel('1')
          .setStyle(Discord.ButtonStyle.Primary),
        new Discord.ButtonBuilder()
          .setCustomId('dota')
          .setLabel('2')
          .setStyle(Discord.ButtonStyle.Primary),
        new Discord.ButtonBuilder()
          .setCustomId('lol')
          .setLabel('3')
          .setStyle(Discord.ButtonStyle.Primary),
      );

    await interaction.reply({ embeds: [welcomEmbed], components: [buttons] });
  }
  
/*
       ------------------- isButton -----------------------
*/

  if(interaction.customId === "csgo"){
    registration(interaction)
  }
  else if(interaction.customId === "dota"){
    registration(interaction)
  }
  else if(interaction.customId === "lol"){
    registration(interaction)
  }

});

client.login(DISCORD_TOKEN);


// Починить
// 46 - как вылавливать сообщение после интеракшона? interaction.options.data - кажется, что-то интересное
// 132 - как обратиться к параметрам кнопок? либо перетащить кнопки в изначальный интеракшон /start?
