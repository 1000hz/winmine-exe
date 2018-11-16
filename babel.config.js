module.exports = {
  env: {
    development: {
      plugins: ["babel-plugin-styled-components"],
      presets: ["next/babel"]
    },
    production: {
      plugins: ["babel-plugin-styled-components"],
      presets: ["next/babel"]
    },
    test: {
      plugins: ["babel-plugin-styled-components"],
      presets: [["@babel/preset-env"], "@babel/preset-react"]
    }
  },
  plugins: ["babel-plugin-root-import"]
}
