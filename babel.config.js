module.exports = {
  env: {
    development: {
      presets: ["next/babel"]
    },
    production: {
      presets: ["next/babel"]
    },
    test: {
      presets: [["@babel/preset-env"], "@babel/preset-react"]
    }
  },
  plugins: ["babel-plugin-root-import"]
}
