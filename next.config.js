const withPlugins = require("next-compose-plugins")
const transpileModules = require("next-transpile-modules")
const optimizedImages = require("next-optimized-images")

module.exports = withPlugins([
  [transpileModules, {transpileModules: ["lodash-es"]}],
  [optimizedImages]
])
