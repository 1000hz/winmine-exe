const Uglify = require("uglifyjs-webpack-plugin")
const withPlugins = require("next-compose-plugins")
const transpileModules = require("next-plugin-transpile-modules")
const optimizedImages = require("next-optimized-images")

module.exports = withPlugins([
  [transpileModules, {transpileModules: ["lodash-es"]}],
  [optimizedImages]
])
