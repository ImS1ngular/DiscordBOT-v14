const Discord = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {

        name: "captcha",
        description: "Ativar o captcha",
        type: Discord.ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {

        if (interaction.user.id !== '') return interaction.reply({ content: 'Você não tem permissão.', ephemeral : true })
                               //^^^^^^^^^ Id da pessoa que pode usar o comando 
            let captcha = new Discord.EmbedBuilder()
            .setAuthor({ name: "Verificação"})
            .setDescription("<a:Verify:1062087970481520741> Clique no botão abaixo para se verificar")
            .setColor("Green")

            const botao = new Discord.ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('botao1')
                        .setLabel('Clique aqui')
                        .setStyle(ButtonStyle.Primary)
                )

            await interaction.channel.send({ embeds: [ captcha ], components: [ botao ] })
            await interaction.reply({ content: 'Você colocou uma verificação.', ephemeral : true })
    }
}