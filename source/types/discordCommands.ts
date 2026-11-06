export const CommandType = {
    global: [0, 1, 2],
    dms: [1, 2],
    guilds: [0],
}

export interface UserCommand {
    name: string;
}

export interface SlashCommand { 
    name: string;
    description: string;
    options?: SlashCommandOptions[];

    metadata: SlashCommandMetadata;

    execute: (interaction: any) => Promise<void>;
}

export interface SlashCommandMetadata {
    scope: typeof CommandType[keyof typeof CommandType];
    guildId?: string;
}

export interface SlashCommandOptions {
    name: string;
    description: string;
    type: number;
    required?: boolean;
    choices?: {
        name: string;
        value: string;
    }[];
}