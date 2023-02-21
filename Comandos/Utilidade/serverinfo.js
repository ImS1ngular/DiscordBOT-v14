const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "Veja as informações do servidor",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "id",
            description: "Cole o ID do servidor",
            type: Discord.ApplicationCommandOptionType.String,
            require: true,
        }
    ],
    run: async (client, interaction) => {

        let membros = interaction.guild.memberCount;
        let cargos = interaction.guild.roles.cache.size;
        let canais = interaction.guild.channels.cache.size;
        let entrou = interaction.guild.joinedTimestamp;
        let servidor = interaction.guild;
        let donoid = interaction.guild.ownerId;
        let emojis = interaction.guild.emojis.cache.size;
        let serverid = interaction.options.getString("id")
        let impulsos = interaction.guild.premiumSubscriptionCount;
        let data = interaction.guild.createdAt.toLocaleDateString("pt-br");


        let ryan = new Discord.EmbedBuilder()
            .setColor("#000000")
            .setThumbnail(interaction.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            .setTitle(`<:moderador:1054057589895340092>  ${interaction.guild}`)
            .addFields(
                {
                    name: `<:estrela:1054057384529637426> Identidade:`,
                    value: `\`\`\`${serverid}\`\`\``,
                    inline: true,
                },
                {
                    name: `<:link:1054057523063296010> Canais em geral:`,
                    value: `<:ponto:1054058313828007987>  Canais: ${canais}\n<:ponto:1054058313828007987>  Cargos: ${cargos}`,
                    inline: true,
                },
                {
                    name: `<:aviso:1054057253449236510> Usuários:`,
                    value: `\`\`\`${membros} membros\`\`\``,
                    inline: true,
                },
                {
                    name: `<:estrela:1054057384529637426> Servidor criado:`,
                    value: `<t:${parseInt(interaction.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `<:aguardando:1054057017934889111> ${interaction.user.username} entrou em:`,
                    value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: `<:admin:1054057300945555497> Dono:`,
                    value: `<@!${donoid}> \n\`\`${donoid}\`\``,
                    inline: true,
                }
        )
        
        
        
        
        interaction.reply({ embeds: [ryan] })
    }
}