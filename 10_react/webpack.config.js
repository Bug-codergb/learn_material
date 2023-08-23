const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: {
    main: {
      import: "./src/index.js"
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean:true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    hot: true,
    port: 8888,
    open:true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: [
          {
            loader:"babel-loader"
          }
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          },
          {
            loader:"less-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,"public/index.html")
    })
  ]
}