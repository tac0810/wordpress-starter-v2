const Tail = require("tail").Tail;
const path = require("path");

const root = path.dirname(__dirname);

require("dotenv").config();

const filePath = path.resolve(root, process.env.THEME_NAME, "my-errors.log");

const tail = new Tail(filePath);

tail.on("line", (data) => {
  console.log(data);
});

tail.on("error", (error) => {
  console.error("Error:", error);
});
