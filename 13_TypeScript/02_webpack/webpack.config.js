const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename:"bundle.js"
  },
  devServer: {
    port: 8888,
    open:true
  },
  resolve: {
    extensions: ['.ts','.tsx','.js','.jsx', '.json', '.wasm'],
  },
  mode:"development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader:"ts-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,"./public/index.html")
    })
  ]
}