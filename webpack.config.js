const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = {
  entry: path.join(__dirname, "./src/package/index.js"), //入口文件
  output: {
    path: path.join(__dirname, "./dist") //出口（打包后）文件路径
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
      { test: /\.(jpg|jpeg|gif|png|)$/, use: "url-loader" },
      { test: /\.(ttf|woff2|woff|eot|svg)$/, use: "url-loader" },
      { test: /\.vue$/, exclude: /node_modules/, use: "vue-loader" }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
