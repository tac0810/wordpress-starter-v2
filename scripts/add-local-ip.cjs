const fs = require("fs");
const os = require("os");
const path = require("path");

const root = path.dirname(__dirname);

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  let localIpAddress;
  for (const interfaceName in interfaces) {
    const iface = interfaces[interfaceName];
    for (const { address, family, internal } of iface) {
      if (family === "IPv4" && !internal) {
        localIpAddress = address;
        break;
      }
    }
    if (localIpAddress) break;
  }

  if (!localIpAddress) {
    console.error("Failed to get local IP address");
    process.exit(1);
    return "0.0.0.0";
  }

  return localIpAddress;
}

(async () => {
  // ローカルネットワークのIPアドレスを取得
  const localIpAddress = getLocalIP();
  const envFilePath = path.resolve(root, ".env");

  // 既存の.envファイルの内容を読み込む
  let envFileContent = "";
  if (fs.existsSync(envFilePath)) {
    envFileContent = fs.readFileSync(envFilePath, "utf8");
  }

  // .envファイルの内容にHOST_MACHINE_IPが既に存在するか確認
  const regex = /^(HOST_MACHINE_IP=)(.*)$/m;
  if (regex.test(envFileContent)) {
    // HOST_MACHINE_IPが既に存在する場合は上書きする
    envFileContent = envFileContent.replace(regex, `$1${localIpAddress}`);
  } else {
    // HOST_MACHINE_IPが存在しない場合は最終行に追記する
    envFileContent += `\nHOST_MACHINE_IP=${localIpAddress}\n`;
  }

  // .envファイルに書き込む
  fs.writeFileSync(envFilePath, envFileContent);

  console.log(
    ".env file has been generated with HOST_MACHINE_IP:",
    localIpAddress,
  );
})();

module.exports = { getLocalIP };
