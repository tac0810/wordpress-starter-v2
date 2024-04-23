import { Tail } from "tail";
import path from "path";
import { config } from "dotenv";

config();

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const filePath = path.resolve(root, process.env.THEME_NAME, "my-errors.log");
const tail = new Tail(filePath);

tail.on("line", (data) => {
  console.log(data);
});

tail.on("error", (error) => {
  console.error("Error:", error);
});
