const fs = require("fs").promises;
const path = require("path");
const { input, password } = require("@inquirer/prompts");

const root = path.dirname(__dirname);

async function generateEnvFile(themeName) {
  const envFilePath = path.resolve(root, ".env");
  try {
    const content = `THEME_NAME=${themeName}\nVITE_THEME_NAME=${themeName}`;
    await fs.writeFile(envFilePath, content);
    console.log(
      ".env file has been created and updated with new THEME_NAME:",
      themeName,
    );
  } catch (error) {
    console.error(error);
  }
}

async function renameTheme(themeName) {
  try {
    // 変更前のディレクトリ名
    const oldDirectoryName = path.resolve(root, "mytheme");
    // 変更後のディレクトリ名
    const newDirectoryName = path.resolve(root, themeName);
    // ディレクトリ名を変更する
    await fs.rename(oldDirectoryName, newDirectoryName);
  } catch (error) {
    console.error(error);
  }
}

async function generateAuthJson(token) {
  const authJsonFilePath = path.resolve(root, "auth.json");
  try {
    const content = `{
  "http-basic": {
    "connect.advancedcustomfields.com": {
      "username": "${token}",
      "password": "https://example.com"
    }
  }
}`;
    await fs.writeFile(authJsonFilePath, content);
    console.log("auth.json file has been created and updated");
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  const themeName = await input({ message: "Input theme name..." });

  await generateEnvFile(themeName);

  await renameTheme(themeName);

  const token = await password({ message: "Input ACF PRO LICENCE KEY..." });

  await generateAuthJson(token);
})();
