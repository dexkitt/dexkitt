import {
    CommandType
} from "../../types/discordCommands.ts";
import type { SlashCommand } from "../../types/discordCommands.ts";

// idea wait
export default {
    name: "ascend",
    description: "ascend someone",
    options: [
        {
            name: "user",
            description: "asadaftrg",
            type: 6,
            required: true,
        },
        {
            name: "evilness",
            description: "how evil are they",
            type: 4,
            required: false,
        },
        {
            name: "reason",
            description: "why",
            type: 3,
            required: true,
        },
    ],
    metadata: {
        scope: CommandType.global,
    },

    execute: async (self: Record<string, any>,interaction: any) => {
        const publicId = self.discord.publicId;
        const interactionToken = interaction.token;
        await fetch(`https://discord.com/api/v10/webhooks/${publicId}/${interactionToken}/messages/@original`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `no die`
            })
        }); // REJECT DIE DIE DIE
    }
} satisfies SlashCommand;