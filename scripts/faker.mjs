import { $ } from "zx";
import { confirm } from "@inquirer/prompts";

const fakerPath = "/var/www/html/faker/entry.sh";

try {
  // const confirmRename = await confirm({
  //   message: `Insert fake data?`,
  //   default: false,
  // });
  //
  // if (!confirmRename) {
  //   echo("Finished!");
  // 	process.exit(0);
  // }

  const { stdout: containerName } = await $`docker ps -f name=wordpress --format "{{.Names}}"`;
  const process = $.spawn("docker", ["exec", containerName.trim(), "bash", fakerPath]);

  process.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  process.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  process.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
} catch (e) {
  console.log(e);
}
