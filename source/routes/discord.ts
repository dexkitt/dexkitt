import type { 
    ExecutionContext
} from "@cloudflare/workers-types";
import * as DiscordInteractions from "discord-interactions"

type Env = Record<string, any>;

export default {
    async fetch(request: Request, self: Env, ctx: ExecutionContext): Promise<Response> {
        const json: Record<string, any> = await request.json();
        const interactionType = json.type;

        if (!interactionType) return new Response("die", { status: 401 });

        const publicId = self.discordId;
        const rawBody = await request.text();

        if (!publicId) return new Response("public bot id is null", { status: 401 });

        const signature = request.headers.get("X-Signature-Ed25519") || "";
        const timestamp = request.headers.get("X-Signature-Timestamp") || "";

        const valid = await DiscordInteractions.verifyKey(rawBody, signature, timestamp, publicId);
        if (!valid) return new Response("invalid signature", { status: 401 });

        switch (interactionType) {
            case 1:
                return new Response(JSON.stringify({
                    type: 1
                }), {status: 200})
            default:
                return new Response("unsupported interaction type", { status: 401 });
        }
    }
}