const { ApplicationCommandType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'bans',
    description: 'exibe a lista de banimentos do servidor',
    type: ApplicationCommandType.ChatInput,
    
    run: async (client, interaction) => {
        if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return;

        let bansFetch = interaction.guild.bans.fetch()
        let mBans = (await bansFetch).map(m => m.user.tag).join("/n")

        if(!mBans) return interaction.reply({
            content: '```O servidor não possui nenhum usuário banido.```'
        })

        if(mBans.length >  4096) return interaction.reply({
            content: '```Não consegui mandar o número de usuários banidos porquê ultrapassou 4096.```',
            ephemeral: true
        })

        interaction.channel.send('```' + mBans + '```').then(i => {
            setTimeout(() => {
                i.delete()
            }, 20000)
        })
    }
}