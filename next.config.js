const Uglify = require("uglifyjs-webpack-plugin")
const withTM = require("next-plugin-transpile-modules")

const transpileOptions = withTM({
  transpileModules: ["lodash-es"]
})

module.exports = transpileOptions

if (process.env.NODE_ENV === "production") {
  module.exports = {
    webpack: function(c) {
      c.plugins = c.plugins.filter(plugin => plugin.constructor.name !== "UglifyJsPlugin")

      c.plugins.push(new Uglify())

      return c
    },
    ...transpileOptions
  }
}
