const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = (env, args) => {
  switch(args.mode) {
    case 'development':
      return {
        mode: "development",
        module: {
          rules: [
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
              test:/\.html$/i,
              loader: "html-loader",
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type:'asset/resource'
            },
          ],
        },
        output: {
          path: path.resolve(__dirname, "dist"),
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
          }),
          new MiniCssExtractPlugin(),
        ],
      }
    case 'production':
      return {
        mode: "production",
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
              test:/\.html$/i,
              loader: "html-loader",
            },
           {
             test: /\.(png|svg|jpg|jpeg|gif)$/i,
             type: 'asset/resource',
           },
          ],
        },
        output: {
          path: path.resolve(__dirname, "dist"),
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
          }),
          new MiniCssExtractPlugin(),
        ],
      }
    default:
      throw new Error('No matching configuration was found!');
  }
}