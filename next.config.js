const withPlugins = require("next-compose-plugins")
const transpileModules = require("next-transpile-modules")(["lodash-es"])
const optimizedImages = require("next-optimized-images")

module.exports = withPlugins([[transpileModules], [optimizedImages]])
