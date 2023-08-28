const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./src/index.js",
  output: {
    
  },
  mode:"development",
  devServer: {
    port: 3000,
    open:true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,"./public/index.html")
    })
  ]
}