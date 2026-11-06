import {
	ExportedHandler, 
	ExecutionContext
} from "@cloudflare/workers-types";

export default {
	async fetch(request: Request, self: Record<string, any>, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const path = url.pathname;
		const sub = 
			url.hostname.split(".").length > 2 
			? url.hostname.split(".")[0] 
			: "";

		if (path === "/favicon.ico") 
			return new Response(null, { status: 404 });

		if (sub === "") {
			if (path === "" || path === "/") {
				return new Response("Hello World!");
			}
			return new Response(null, { status: 404 });
		}

		const mod = await import(`./routes/${sub}.ts`);
		if (!mod || !mod.default || !mod.default.fetch)
			return new Response(null, { status: 404 });

		return await mod.default.fetch(request, self, ctx);
	},
} satisfies ExportedHandler<Env>;
