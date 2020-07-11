module.exports = {
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"]
    }
  },
  plugins: ["babel-plugin-styled-components", "babel-plugin-root-import"],
  presets: ["next/babel"]
}
