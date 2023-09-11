module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    requireConfigFile: false,
    ecmaFeatures: {
      jsx: true,
      modules: true,
      experimentalObjectRestSpread: true,
    },
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
};
