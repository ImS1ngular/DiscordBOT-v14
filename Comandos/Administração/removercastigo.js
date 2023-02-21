const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
        name: 'removercastigo',
        description: 'Remova o castigo de algum usuário.',
        options: [
                {
                        name: 'usuário',
                        description: 'Selecione o usuário para remover o  castigo.',
                        type: 6,
                        required: true,
                },
                {
                        name: 'motivo',
                        type: Discord.ApplicationCommandOptionType.String,
                        description: 'Coloque o motivo do castigo.',
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

                        const member = interaction.options.getMember('usuário');
                        let usuario = interaction.options.getUser("usuário")
                        let motivo = interaction.options.getString("motivo") || `Nenhum`
                        let channel = client.channels.cache.get("") //id do canal de logs dos castigos
                        let membro = interaction.guild.members.cache.get(usuario.id);

                        const embedcastigo2 = new Discord.EmbedBuilder()
                        .setColor('#00FF00')
                        .setThumbnail(membro.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png'}))
                        .setTitle(`LOG - Usuário Perdoado`)
                        .setFooter({ text: `Perdoado por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
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
                                name: `💻 - Autor do comando:`,
                                value: ` ${interaction.user} - (${interaction.user.id})`,
                            },
                            {
                                name: `📜 - Motivo`,
                                value: `( ${motivo} )`,
                            },
                            {
                                name: `⏰ - Horário`,
                                value: `<t:${moment(interaction.createdTimestamp).unix()}>(<t:${~~(new Date(interaction.createdTimestamp) / 1000)}:R>)`,
                            }
                        )
        

                        if (!member.isCommunicationDisabled()) {
                                return interaction
                                        .reply({
                                                content: 'Ops, este usuário não está de castigo.',
                                                ephemeral: true,
                                        })
                                        .catch((e) => { });
                        }
                        await member.disableCommunicationUntil(null, `${motivo}`);
                        interaction.reply('**O castigo foi tirado com sucesso**')
                        channel.send({embeds: [embedcastigo2]}).catch(e => {
                            interaction.reply('Ops não consegui tirar o castigo')
                        })
                }
        }
}

