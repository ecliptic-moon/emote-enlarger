const Discord = require('discord.js');
const fs = require('fs');
const { token } = require('./auth.json');
const { prefix } = require('./conf.json')

const client = new Discord.Client();

client.on('ready', () => {
    console.log('[e: Ready] I am ready!');
    client.user.setActivity(`${client.guilds.size} guilds`, {type: 'WATCHING'});
});

client.on('message', msg => {
    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;

    if(msg.content.startsWith(prefix + 'ping')) {
        msg.channel.send('Ponging...').then(res => {
            res.edit(`Pong! \`${res.createdTimestamp - msg.createdTimestamp}ms\``);
        });
    }

    if(msg.content.startsWith(prefix + 'invite')) {
        const embed = new Discord.RichEmbed()
        .setTitle('Invite Wizard')
        .setColor('RANDOM')
        .setDescription('Type `s` or `b` to get the corresponding invite')
        .setFooter('S means support and will give you the support server, whereas B means bot and will give you the bot\'s invite')
        msg.channel.send({ embed })
        .then(() => {
            msg.channel.awaitMessages(response => ['s','b'].includes(response.content.toLowerCase()), {
                max: 1,
                time: 60000,
                errors: ['time'],
            })
            .then((collected) => {
                if(collected.first().content.toLowerCase().includes('s')) {
                    msg.reply('For support, join: https://discord.gg/HEnpVwW');
                } else if(collected.first().content.toLowerCase().includes('b')) {
                    msg.reply('Invite me here: https://discordapp.com/api/oauth2/authorize?client_id=428787507849723914&permissions=49152&scope=bot');
                }
            })
            .catch(() => {
                msg.channel.send('Timer up')
            });
        });
    }

    if(msg.content.startsWith(prefix + 'help')) {
        const embed = new Discord.RichEmbed()
        .setTitle(`${client.user.username} Help`)
        .setColor('RANDOM')
        .setDescription(`Detailed help documentation for ${client.user.username}`)
        .addBlankField(true)
        .addField('No-Category', `
${prefix}ping | Pings the bot\n
${prefix}invite | Interactive support server/bot invite wizard`)
        .setFooter(`Coded with ❤ by Lunar#2955`)

        msg.author.send({ embed });
    }
});

client.login(token);
