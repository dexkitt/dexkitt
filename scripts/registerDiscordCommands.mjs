// read dirs
import fs from 'fs';
import env from 'dotenv';
env.config();

const globDiscordUrl = `https://discord.com/api/v10/applications/${process.env.appId}/commands`
const guildDiscordUrl = (guildId) => `https://discord.com/api/v10/applications/${process.env.appId}/guilds/${guildId}/commands`

const workingDir = process.cwd();
const slashDir = `${workingDir}/source/cmds/slash`;
const userDir = `${workingDir}/source/cmds/user`;

const slashFiles = fs.readdirSync(slashDir).filter(file => file.endsWith('.ts'));
//const userFiles = fs.readdirSync(userDir).filter(file => file.endsWith('.ts'));

const slashCmds = []
//const userCmds = [];

const final = {
    global: [],
};

for (const file of slashFiles) {
    let cmd; try {
        cmd = await import(`${slashDir}/${file}`);
    } catch (e) {console.error(e)}

    if (!cmd || !cmd.default) continue;

    const slashInstance = {
        data: {
            name: cmd.default.name,
            description: cmd.default.description,
            contexts: cmd.default.metadata.scope,
            options: cmd.default.options
        },
        guildId: cmd.default.metadata.guildId,
    }

    slashCmds.push(slashInstance);
}

for (const slashInstance of slashCmds) {
    if (slashInstance.guildId) {
        if (!final[slashInstance.guildId]) final[slashInstance.guildId] = [];
        final[slashInstance.guildId].push(slashInstance.data);
    } else {
        final.global.push(slashInstance.data);
    }
}

for (const key in final) {
    const url = key === 'global' ? globDiscordUrl : guildDiscordUrl(key);
    const body = JSON.stringify(final[key]);

    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bot ${process.env.appToken}`
        },
        body
    });
}