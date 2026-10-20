package dev.dexkitt.client;

import net.fabricmc.api.ClientModInitializer;
import dev.dexkitt.Common;

public class Client implements ClientModInitializer {
	@Override
	public void onInitializeClient() {
    Common.logger.info("Client placeholder");
		// This entrypoint is suitable for setting up client-specific logic, such as rendering.
	}
}