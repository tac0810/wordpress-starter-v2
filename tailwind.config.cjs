const glob = require("glob");
const { loadEnv } = require("vite");
const { container, kerning } = require("./tailwind-plugins.cjs");

const { THEME_NAME } = loadEnv(process.env.NODE_ENV, process.cwd(), "");
// https://github.com/WebDevStudios/wd_s/pull/804#issuecomment-997018146
const topLevelPhpFiles = glob.sync(`./source/${THEME_NAME}/*.php`);

/** @type {import('tailwindcss/types').Config} */
module.exports = {
  content: [
    ...topLevelPhpFiles,
    `./source/${THEME_NAME}/inc/**/*.php`,
    "./source/**/*.twig",
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
