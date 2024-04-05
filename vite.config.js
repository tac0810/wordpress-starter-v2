import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
	const { THEME_NAME } = loadEnv(mode, process.cwd(), '')
	return {
		build: {
			outDir: `./source/${THEME_NAME}/build`,
			assetsDir: '',
			manifest: true,
			rollupOptions: {
				input: '/source/index.ts',
			},
		},
		server: {
			hmr: true,
			port: 3000,
			origin: 'http://localhost:8080',

			// proxy: {
			// 	"": {
			// 		target: "http://localhost:8080",
			// 		changeOrigin: true
			// 	}
			// 	// "/@vite/client": {
			// 	// 	target:"http://localhost:3000/@vite/client",
			// 	// 	changeOrigin: true
			// 	// }
			// }
		},
	}
})