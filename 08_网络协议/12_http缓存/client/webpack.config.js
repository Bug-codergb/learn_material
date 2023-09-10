const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  entry: "./src/index.js",
  mode:"development",
  devServer: {
    open: true,
    port: 3000,
    hot:true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:"./public/index.html"
    })
  ]
}