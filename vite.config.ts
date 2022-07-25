import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		preact(),
		VitePWA({
			registerType: 'prompt',
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'service_worker.ts',
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: 'index.html',
			},
			injectManifest: {
				globPatterns: ['**/*.{js,css,html,png,webp,svg,mp3}'],
			},
		}),
	],
});
