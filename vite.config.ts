import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
	plugins: [
		// Only enable sveltekit() in development mode
		sveltekit(),
	],
	define: {
		'process.env': {
			CLIENT_ID: process.env.CLIENT_ID,
			API_KEY: process.env.API_KEY,
		},
	},
});