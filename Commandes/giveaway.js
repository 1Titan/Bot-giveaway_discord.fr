let Discord = require('discord.js');

module.exports = {
    name: 'giveaway',
    execute(client, message){
        if (!message.guild) return;
        async function giveaway() {
            if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Vous n’avez pas suffisamment de permissions pour utiliser cette commande.');
            if (!message.content.split(' ')[1]) return messages.channel.send('Veuillez saisir une durée pour le cadeau (en heures).');
            const stated_duration_hours = message.content.split(' ')[1];
            const actual_duration_hours = stated_duration_hours * 3600000;
            const prize = message.content.split(' ').slice(2).join(' ');
            if (isNaN(stated_duration_hours)) return message.channel.send('La durée doit être un nombre.');
            if (stated_duration_hours < 1) return message.channel.send('La durée doit être d au moins 1.');
            if (prize === '') return message.channel.send('Vous devez entrer un prix.');
            var hour_s = 'heures';
            if (stated_duration_hours > 1) {
                var hour_s = 'heures';
            }
            const embed = new Discord.MessageEmbed()
            .setTitle(`${prize}`)
            .setColor('36393F')
            .setDescription(`Réagissez avec 🎉 entrer !\nDurée : **${stated_duration_hours}** ${hour_s}\nHeberger par : ${message.author}`)
            .setTimestamp(Date.now() + (stated_duration_hours *60*60*1000))
            .setFooter('Ends at')
            let msg = await message.channel.send(':tada: **GIVEAWAY** :tada:', embed)
            await msg.react('🎉')
            setTimeout(() => {
                msg.reactions.cache.get('🎉').users.remove(client.user.id)
                setTimeout(() => {
                    let winner = msg.reactions.cache.get('🎉').users.cache.random();
                    if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
                        const winner_embed = new Discord.MessageEmbed()
                        .setTitle(`${prize}`)
                        .setColor('36393F')
                        .setDescription(`Gagnant:\nPersonne n'est entré dans le giveaway.\nHeberger par: ${message.author}`)
                        .setTimestamp()
                        .setFooter('Fini a')
                        msg.edit(':tada: **GIVEAWAY FINI** :tada:', winner_embed);
                    }
                    if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
                        const winner_embed = new Discord.MessageEmbed()
                        .setTitle(`${prize}`)
                        .setColor('36393F')
                        .setDescription(`Gagnant :\n${winner}\nHeberger par : ${message.author}`)
                        .setTimestamp()
                        .setFooter('Fini a')
                        msg.edit(':tada: **GIVEAWAY FINI** :tada:', winner_embed);
                    }
                }, 1000);
            }, actual_duration_hours);
        }
        giveaway();
    }
}