export default {
	async fetch(request: Request, self: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);
		const subDomain = url.hostname.split(".").length > 2 ? url.hostname.split(".")[0] : "";

		if (subDomain.length <= 0) {
			return new Response("hi");
		}

		const route = await import(`./routes/${subDomain}`);
		if (!route || !route.default || !route.default.fetch) {
			return new Response("what?", { status: 404 });
		}

		return await route.default.fetch(request, self, ctx);
	},
} satisfies ExportedHandler<Env>;
