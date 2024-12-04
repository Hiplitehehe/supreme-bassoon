require('dotenv').config();

module.exports = {
    Main: {
        token: process.env.TOKEN,
        guildId: 'guildId', // Your Server ID (Guild ID) [ Required ]
        staffRoleId: 'staffRoleId' // Staff role ID [ Optional ]
    },
    playerList: {
        ipandport: 'ipandport:ipandport', // IP and port of your server [ Required ]
        embedColorServerOnline: 'GREEN', // Embed color [ Optional ]
        embedColorServerOffline: 'DARK_RED', // Embed color [ Optional ]
        channelId: 'channelId', // Channel ID where you want to show player list [ Required ]
        websiteURL: 'https://fly2host.co.il', // Your website URL [ Optional ]
        showFields: true // Show fields in player list [ Optional ]
    },
    topPlayers: {
        players: 10, // Maximum 50 players [ Required ]
        staffShow: true, // Show staff members in top players [ Required ]
        embedColor: 'GREEN', // Embed color [ Required ]
        channelId: 'channelId' // Channel ID where you want to show top players [ Required ]
    },
    Commands: {
        prefix: '!', // Bot prefix [ Required ]
        ipCMD: {
            enable: true, // Enable IP command - use only true or false [ required ]
            embedColor: 'GREEN', // Embed color [ Optional ]
        }
    }
};