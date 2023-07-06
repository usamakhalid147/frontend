const isCiBuild = !!process.env.CI;
if (!isCiBuild) {
  require("dotenv").config({
    path: "./config/config.env",
  });
}

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
module.exports = {
  entry: ["./js/app.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer: {
    static: "./dist",
  },
  plugins: [
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(process.env.API_URL),
      FRONTEND_URL: JSON.stringify(process.env.FRONTEND_URL),
    }),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),

    new HtmlWebpackPlugin({
      filename: "contact.html",
      template: "./contact.html",
    }),
    new HtmlWebpackPlugin({
      filename: "gencode.html",
      template: "./gencode.html",
    }),
    new HtmlWebpackPlugin({
      filename: "detail.html",
      template: "./detail.html",
    }),
    new HtmlWebpackPlugin({
      filename: "visualise.html",
      template: "./visualise.html",
    }),
    new HtmlWebpackPlugin({
      filename: "resources.html",
      template: "./resources.html",
    }),
    new HtmlWebpackPlugin({
      filename: "expressionlevel.html",
      template: "./expressionlevel.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(gif|svg|png|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
            },
          },
        ],
      },
      {
        test: /\.pdf$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "pdfs/",
            },
          },
        ],
      },
    ],
  },
};
