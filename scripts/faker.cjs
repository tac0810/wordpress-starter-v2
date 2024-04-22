require("dotenv").config();

const { confirm } = require("@inquirer/prompts");
const path = require("path");
const root = path.dirname(__dirname);
const { THEME_NAME } = process.env;
const fakerPath = "/var/www/html/faker/entry.sh";

(async () => {
  try {
    // const confirmRename = await confirm({
    //   message: `Insert fake data?`,
    //   default: false,
    // });
    //
    // if (!confirmRename) {
    //   echo("Finished!");
    //   return;
    // }

    const { stdout: containerName } = await $`docker ps -f name=wordpress --format "{{.Names}}"`;
    const p = await $`docker exec -it ${containerName.trim()} bash ${fakerPath}`;
    console.log(p.stdout);
  } catch (e) {
    console.log(e);
  }
})();
