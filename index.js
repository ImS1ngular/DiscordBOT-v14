const Discord = require("discord.js")

const config = require("./config.json")

const { EmbedBuilder, AuditLogEvent, Events } = require('discord.js');


const client = new Discord.Client({ 
  intents: [ 
    Discord.GatewayIntentBits.Guilds, 
    Discord.GatewayIntentBits.GuildMembers, 
    Discord.GatewayIntentBits.GuildBans, 
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.GuildScheduledEvents,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.MessageContent
       ]
    });

module.exports = client

client.on('interactionCreate', (interaction) => {

  if(interaction.type === Discord.InteractionType.ApplicationCommand){

      const cmd = client.slashCommands.get(interaction.commandName);

      if (!cmd) return interaction.reply(`Error`);

      interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

      cmd.run(client, interaction)

   }

   if (interaction.customId === "botao1") {

    let cargo = ""; // ID DO CARGO QUE IRÁ RECEBER AO CLICAR NO BOTÃO

    interaction.member.roles.add(cargo)

    interaction.reply({ content: '<a:Verify:1062087970481520741> Você foi verificado.', ephemeral : true })

  }
})

client.on('ready', () => {
  console.log(`🔥 Estou online em ${client.user.username}!`)
})


client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(config.token)

//--------------------------------------------------Logs Entrada-----------------------------------------------

client.on("guildMemberAdd", (member) => {
    let canal_logs = "";
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Boas Vindas!")
    .setDescription(`> Olá ${member}!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) 
  })
//--------------------------------------------------Logs Entrada-----------------------------------------------
  

//--------------------------------------------------Logs Saída-----------------------------------------------

  client.on("guildMemberRemove", (member) => {
    let canal_logs = ""; // Coloque o ID do canal de texto
    if (!canal_logs) return;
  
    let embed = new Discord.EmbedBuilder()
    .setColor("Red")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`Adeus ${member.user.username}....`)
    .setDescription(`> O usuário ${member} saiu do servidor!\n> 😓 Espero que retorne um dia.\n> Nos sobrou apenas \`${member.guild.memberCount}\` membros.`);
  
    member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `${member}` }) // Caso queira que o usuário não seja mencionado, retire a parte do "content". 
  })

//--------------------------------------------------Logs Saída-----------------------------------------------


//--------------------------------------------------Logs Auto Reagir-----------------------------------------------

  client.on("messageCreate", (message) => {
  
    if (message.channel.id === "" /*id do canal para auto reagir.*/) {
  
      let emoji1 = "<:gostei:1054057328976080917>"
      let emoji2 = "<:desgostei:1054057351952478218> "
  
      message.react(emoji1).catch(e => { })
      message.react(emoji2).catch(e => { })
  
    } else { return; }
  })
//--------------------------------------------------Logs Auto Reagir-----------------------------------------------


//--------------------------------------------------Logs Mensagens Deletadas-----------------------------------------------
  client.on("messageDelete", (message, oldMessage, newMessage) => {
    const channel = client.channels.cache.get("");  // Coloque o ID do canal das logs
    const embed = new Discord.EmbedBuilder()
        .setTitle(`LOG - Mensagem Deletada`)
        .setColor('Black')
        .setFooter({text: `Knights of Jabu`})
        .setTimestamp(new Date())
        .setDescription(`**Autor da mensagem** \n> **Usuário:** ${message.author} \n> **ID:** ${message.author.id} \n\n**Canal:** \n> ${message.channel} \n\n**Mensagem deletada:** \n> \`\`\`${message.content}\`\`\``)
        channel.send({ embeds: [embed] });
  })
//--------------------------------------------------Logs Mensagens Deletadas-----------------------------------------------


//--------------------------------------------------Logs Mensagens Editadas-----------------------------------------------
  client.on("messageUpdate", (message, oldMessage, newMessage) => {
      const channel = client.channels.cache.get("");  // Coloque o ID do canal das logs
      const embed = new Discord.EmbedBuilder()
          .setTitle(`LOG - Mensagem Editada`)
          .setColor('Black')
          .setFooter({text: `Knights Of Jabu`})
          .setTimestamp(new Date())
  
          .setDescription(`**Autor da mensagem** \n> **Usuário:** ${message.author} \n> **ID:** ${message.author.id} \n\n**Canal:** \n> ${message.channel} \n\n**Mensagem antiga:** \n> \`\`\`${message.content}\`\`\` \n\n**Mensagem nova:** \n> \`\`\`${oldMessage.content}\`\`\``)
          channel.send({ embeds: [embed] });
  })
//--------------------------------------------------Logs Mensagens Editadas-----------------------------------------------


//--------------------------------------------------Logs Ban-----------------------------------------------
client.on("guildBanAdd", (member) => {
  const channel = client.channels.cache.get("");  // Coloque o ID do canal das logs
  const embed = new Discord.EmbedBuilder()
  .setColor("#FF0000")
  .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`)
  .setTitle(`Log - Usuário Banido.`)
  .setDescription(`‣ Informações do usuário:\n > **Membro:${member.user}** \n > **ID:${member.user.id}**`)
  .setFooter({ text:  `© ${client.user.username} 2023`})
  .setTimestamp(new Date())
  channel.send({ embeds: [embed] });
})
//--------------------------------------------------Logs Ban-----------------------------------------------


//--------------------------------------------------Logs Unban-----------------------------------------------
client.on("guildBanRemove", (member) => {
  const channel = client.channels.cache.get("");  // Coloque o ID do canal das logs
  const embed = new Discord.EmbedBuilder()
  .setColor("#00FF00")
  .setThumbnail(`${client.user.displayAvatarURL({ size: 2048 })}`) 
  .setTitle(`LOG - Usuário Desbanido.`)
  .setDescription(`‣ Informações do usuário:\n > **Membro:${member.user}** \n > **ID:${member.user.id}**`)
  .setFooter({ text:  `© ${client.user.username} 2023`})
  .setTimestamp(new Date())
  channel.send({ embeds: [embed] });
})
//--------------------------------------------------Logs UnBan-----------------------------------------------""""