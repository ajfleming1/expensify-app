const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === "test") {
  require('dotenv').config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
  require('dotenv').config({ path: ".env.development" });
}

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
      CSSExtract,
      new webpack.DefinePlugin({
        "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        "process.env.FIREBASE_DATABASE_URL": JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        "process.env.FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        "process.env.FIREBASE_APP_ID": JSON.stringify(process.env.FIREBASE_APP_ID),
        "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID)
      })
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
