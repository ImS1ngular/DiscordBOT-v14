const ms = require("ms")
const Discord = require("discord.js")
const moment = require('moment')

module.exports = {
    name: 'castigo',
    description: 'Coloque algum usuário de castigo.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Selecione um usuário para receber o castigo.',
            required: true,
        },
        {
            name: 'tempo',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Selecione um tempo para colocar o usuário de castigo.',
            required: true,
            choices: [
                {
                    name: '30 Segundos',
                    value: '30s',
                },
                {
                    name: '1 Minuto',
                    value: '1m',
                },
                {
                    name: '5 Minutos',
                    value: '5m',
                },
                {
                    name: '10 Minutos',
                    value: '10m',
                },
                {
                    name: '15 Minutos',
                    value: '15m',
                },
                {
                    name: '30 Minutos',
                    value: '30m',
                },
                {
                    name: '45 Minutos',
                    value: '45m',
                },
                {
                    name: '1 Hora',
                    value: '1h',
                },
                {
                    name: '2 Horas',
                    value: '1h',
                },
                {
                    name: '5 Horas',
                    value: '1h',
                },
                {
                    name: '12 Horas',
                    value: '12h',
                },
                {
                    name: '24 Horas',
                    value: '24h',
                },
                {
                    name: '1 Dia',
                    value: '24h',
                },
                {
                    name: '3 dias',
                    value: '72h',
                },
                {
                    name: '1 Semana',
                    value: '168h',
                },
            ]
        },
        {
            name: 'motivo',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Coloque o motivo do castigo',
            required: false,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: `Você não possui permissão para utilizar esse comando.`,
                ephemeral: true,
            })

        } else {

            let usuario = interaction.options.getUser("usuário")
            let tempo = interaction.options.getString("tempo")
            let motivo = interaction.options.getString("motivo") || `Nenhum`
            let membro = interaction.guild.members.cache.get(usuario.id);
            let channel = client.channels.cache.get("") //id do canal de logs dos castigos



            const embedcastigo = new Discord.EmbedBuilder()
            .setColor('#8B0000')
            .setThumbnail(membro.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png'}))
            .setTitle(`LOG - Usuário Castigado`)
            .setFooter({ text: `Castigado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
            .addFields(
                {
                    name: `👤 - Membro:`,
                    value: `⭐ - Menção:\n${membro.user}`,
                },
                {
                    name: `🏷️ - TAG:`,
                    value: `(${membro.user.tag})`,
                },
                {
                    name: `🆔 - ID:`,
                    value: `(${membro.user.id})`,
                },
                {
                    name: `🏠 - Servidor:`,
                    value: `(${interaction.guild.name})`,
                },
                {
                    name: `💻 - Autor da punição:`,
                    value: ` ${interaction.user} - (${interaction.user.id})`,
                },
                {
                    name: `📜 - Motivo`,
                    value: `( ${motivo} )`,
                },
                {
                    name: `⏰ - Tempo de Punição`,
                    value: `( ${tempo} )`,
                },
                {
                    name: `⏰ - Horário`,
                    value: `<t:${moment(interaction.createdTimestamp).unix()}>(<t:${~~(new Date(interaction.createdTimestamp) / 1000)}:R>)`,
                }
            )

   
            let duracao = ms(tempo);
            membro.timeout(duracao, motivo).then(() => {
                interaction.reply('**O membro foi castigado com sucesso**')
                channel.send({embeds: [embedcastigo]}).catch(e => {
                    interaction.reply('Não consigo castigar esse usuário')
                })
            })
        }
    }
}