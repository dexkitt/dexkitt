import {
    SlashCommand,
    CommandType
} from "./../../types/discordCommands.ts";
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

    execute: async (interaction: any) => {
    }
} satisfies SlashCommand;