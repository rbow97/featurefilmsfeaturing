const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// dist - the folder where everything that is going to be distributed to a server will be stored in.

module.exports = {
  // entry - where webpack will start bundling. i.e. where it will start looking for all the dependencies which it should then bundle together.
  entry: "./src/js/app.js",
  // output - where the bundle.js is stored. This is all of the bundled javascript which will interact with everything in the dist folder.
  output: {
    // path - a dynamic way of declaring the path to dist. First arg is where we are.
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js"
  },
  devServer: {
    contentBase: "./dist"
  }
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       filename: "index.html",
  //       template: "./src/index.html"
  //     })
  //   ]
};
