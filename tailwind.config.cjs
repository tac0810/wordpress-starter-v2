const glob = require("glob");
const { container, kerning } = require("./tailwind-plugins.cjs");

require("dotenv").config();

const THEME_NAME = process.env.THEME_NAME;
// https://github.com/WebDevStudios/wd_s/pull/804#issuecomment-997018146
const topLevelPhpFiles = glob.sync(`./${THEME_NAME}/*.php`);

/** @type {import('tailwindcss/types').Config} */
module.exports = {
  content: [
    ...topLevelPhpFiles,
    `./${THEME_NAME}/inc/**/*.php`,
    "./**/*.twig",
    "./source/**/*.{js,ts}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["sans-serif"],
        serif: ["serif"],
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [container, kerning],
};
