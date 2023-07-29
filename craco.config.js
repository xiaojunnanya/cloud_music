const path = require("path")
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    { plugin:CracoLessPlugin }
  ],
  webpack:{
    alias:{
      "@":path.resolve(__dirname,"src")
    }
  }
}