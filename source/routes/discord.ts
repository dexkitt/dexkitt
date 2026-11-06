import { 
    ExecutionContext
} from "@cloudflare/workers-types";
import {
    verifyKey
} from "discord-interactions"

export default {
    async fetch(request: Request, self: Record<string, any>, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const json = await request.json();

        const type = json.type || null;
        const path = url.pathname;

        const publicKey = self.discord.publicId;

        const signature = request.headers.get("X-Signature-Ed25519") || "";
        const timestamp = request.headers.get("X-Signature-Timestamp") || "";

        const isValidRequest = await verifyKey(
            await JSON.stringify(json),
            signature,
            timestamp,
            publicKey
        );

        if (!isValidRequest) return new Response("invalid", { status: 401 });

        switch (path) {
            case "/interactions":
                switch (type) {
                    case 1:
                        return Response.json({ type: 1 }, { status: 200 });
                }
                return new Response("invalid", { status: 400 });
            case "/webhook":
                return new Response("invalid", { status: 400 });
        }

        return new Response("invalid", { status: 400 });
    }
}