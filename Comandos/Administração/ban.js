const Discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'ban',
    description: 'Banir um menbro do servidor',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'usuário',
            type: Discord.ApplicationCommandOptionType.User,
            description: 'Mencione um usuário.',
            required: true,
        },
        {
            name: 'motivo',
            type: Discord.ApplicationCommandOptionType.String,
            description: 'Digite o motivo.',
            required: false,
        }
    ],
    run: async (client, interaction, options) => {
        let user = interaction.options.getUser("usuário");
        let motivo = interaction.options.getString("motivo") || `Motivo não informado`;

        let channel = client.channels.cache.get("") //id do canal de logs ban

        if (!interaction.channel.permissionsFor(interaction.user).has(Discord.PermissionFlagsBits.BanMembers))
            return interaction.reply({
                content: `**\\❌ | ${interaction.user}, Você precisa da permissão \`BAN_MEMBERS\` para usar este comando!**`,
                ephemeral: true,
            })

        if (!interaction.channel.permissionsFor(interaction.client.user).has(Discord.PermissionFlagsBits.BanMembers))
            return interaction.reply({
                content: `**\\❌ | ${interaction.user}, Eu preciso da permissão \`BAN_MEMBERS\`**`,
                ephemeral: true,
            })

        if (user.id === interaction.user.id) return interaction.reply({
            content: `\\❌ **| Você não pode se proprio banir.**`,
            ephemeral: true
        })
        if (user.id === client.user.id) return interaction.reply({
            content: `\\❌ **| Você não pode me banir.**`,
            ephemeral: true
        })
        if (user.id === interaction.guild.ownerId) return interaction.reply({
            content: `\\❌ **| Você não pode banir o dono do servidor.**`,
            ephemeral: true
        })

        interaction.guild.members.ban(user, { reason: [motivo] }).then(() => {
            interaction.reply({ embeds: [MemberEmbed] })
            channel.send({ embeds: [embedbann] })
        }).catch(e => {
            interaction.reply({ content: `\\❌ | **Não foi possivel Banir ${user}(\`${user.id}\`) do servidor**`, ephemeral: true })
        })

        let MemberEmbed = new Discord.EmbedBuilder()
            .setColor('Red')
            .setDescription(`**${user.tag} foi banido com sucesso! Quem mandou quebrar as regras?!**`)
            .addFields(
                { name: `📜 - Motivo:`, value: `\`${motivo}\`` },
                { name: `🏠 - Servidor:`, value: ` \`${interaction.guild.name}\`` },
                { name: `👤 - Usuário Banido:`, value: `${user.tag} - (${user.id})` },
                { name: `💻 - Autor do banimento:`, value: `${interaction.user} - (${interaction.user.id})` },
                { name: `⏰ - Horário`, value: `<t:${moment(interaction.createdTimestamp).unix()}>(<t:${~~(new Date(interaction.createdTimestamp) / 1000)}:R>)`, }
            )
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })


        const embedbann = new Discord.EmbedBuilder()
            .setColor('Red')
            .setThumbnail(user.displayAvatarURL({ dinamyc: true, size: 2048, format: 'png'}))
            .setTitle(`LOG - Usuário Banido`)
            .setFooter({ text: `Banido Por: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dinamyc: true }) })
            .addFields(
                {
                    name: `👤 - Membro:`,
                    value: `⭐ - Menção:\n${user}`,
                },
                {
                    name: `🏷️ - TAG:`,
                    value: `(${user.tag})`,
                },
                {
                    name: `🆔 - ID:`,
                    value: `(${user.id})`,
                },
                {
                    name: `🏠 - Servidor:`,
                    value: `(${interaction.guild.name})`,
                },
                {
                    name: `💻 - Autor do banimento:`,
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

    }
}