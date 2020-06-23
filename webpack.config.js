const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (env) => {
  const isProduction = env === "production";
  const CSSExtract = new ExtractTextPlugin("styles.css");

  return ({
    entry: './src/app.tsx',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'public/dist')
    },

    mode: "development",

    // Enable sourcemaps for debugging webpack's output.
    devtool: isProduction ? "source-map" : "inline-source-map",

    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js"]
      //extensions: [".ts", ".tsx"]
    },

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          test: /\.s?css$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        }
      ]
    },

    plugins: [
      new HtmlWebPackPlugin({ template: "./src/index.html", filename: "../index.html" }),
      CSSExtract
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: "/dist/",
      compress: true,
      port: 9000,
      historyApiFallback: true
    },

    watch: false
  });
};
