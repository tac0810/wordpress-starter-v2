const fs = require('fs');
const os = require('os');

// ローカルネットワークのIPアドレスを取得
const interfaces = os.networkInterfaces();
let localIpAddress;
for (const interfaceName in interfaces) {
	const iface = interfaces[interfaceName];
	for (const { address, family, internal } of iface) {
		if (family === 'IPv4' && !internal) {
			localIpAddress = address;
			break;
		}
	}
	if (localIpAddress) break;
}

if (!localIpAddress) {
	console.error('Failed to get local IP address');
	process.exit(1);
}

// .env.development ファイルに書き込む内容
const envContent = `HOST_MACHINE_IP=${localIpAddress}\n`;

// .env.development ファイルを作成
fs.writeFileSync('.env.development', envContent);

console.log('.env.development file has been generated with HOST_MACHINE_IP:', localIpAddress);
