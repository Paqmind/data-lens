import Path from "path";
import Webpack from "webpack";

// CONFIG ==========================================================================================
export default {
  // Compilation target: http://webpack.github.io/docs/configuration.html#target
  target: "node",

  // Entry files: http://webpack.github.io/docs/configuration.html#entry
  entry: {
    index: "./src/index",
  },

  // Output files: http://webpack.github.io/docs/configuration.html#output
  output: {
    // Abs. path to output directory: http://webpack.github.io/docs/configuration.html#output-path
    path: Path.resolve("."),

    // Filename of an entry chunk: http://webpack.github.io/docs/configuration.html#output-filename
    filename: "dist/[name].js",

    // Library name (not used)
    library: "paqmind.data-lens",

    // Format to export library: http://webpack.github.io/docs/configuration.html#output-librarytarget
    libraryTarget: "commonjs2",
  },

  // Enhance debugging: http://webpack.github.io/docs/configuration.html#devtool
  devtool: "inline-source-map",

  // Options, affecting modules: http://webpack.github.io/docs/configuration.html#module
  module: {
    // Auto applied loaders: http://webpack.github.io/docs/loaders.html
    loaders: [
      // JS
      {test: /\.(js(\?.*)?)$/, loaders: ["babel?stage=0"], exclude: /node_modules/},
    ],
  },

  // Module resolving: http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    // Abs. path with modules: http://webpack.github.io/docs/configuration.html#resolve-root
    root: Path.resolve("./src"),

    // Additional folders: http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
    modulesDirectories: ["web_modules", "node_modules"],
  },

  // Loader resolving: http://webpack.github.io/docs/configuration.html#resolveloader
  resolveLoader: {
    // Abs. path with loaders
    root: Path.resolve("./node_modules"),
  },
};
