import {
    CommandType
} from "./../../types/discordCommands.ts";
import type { SlashCommand } from "./../../types/discordCommands.ts";

const list = [
    "..no.",
    "im not doing that.",
    "no thanks.",
    "absolutely not.",
    "i am not kissing <@{user}>.",
    "nope.",
]

// haha funny
export default {
    name: "kiss",
    description: "ooooooo",
    options: [
        {
            name: "user",
            description: "who",
            type: 6,
            required: true,
        }
    ],
    metadata: {
        scope: CommandType.global,
    },

    execute: async (self: Record<string, any>,interaction: any) => {
        const publicId = self.discord.publicId;
        const interactionToken = interaction.token;

        const userId = interaction.data.options.find((option: any) => option.name === "user").value;
        const response = list[Math.floor(Math.random() * list.length)].replace("{user}", userId);

        await fetch(`https://discord.com/api/v10/webhooks/${publicId}/${interactionToken}/messages/@original`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `*${response}*`
            })
        }); // REJECT DIE DIE DIE
    }
} satisfies SlashCommand;