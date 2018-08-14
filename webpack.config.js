const { resolve } = require('path')
var webpack = require('webpack');
//const copyWebpackPlugin = require('copy-webpack-plugin')

var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });


module.exports = {
  target: 'node',
  entry: resolve(__dirname, 'src/server.ts'),
  devtool: 'sourcemap',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: [/\.(test|spec|e2e)\.ts$/],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['node_modules', 'src'],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({banner: 'require("source-map-support").install();',
                              raw: true, entryOnly: false })
    // new uglifyJSPlugin({
    //   uglifyOptions: {
    //     ecma: 8,
    //     sourceMap: true,
    //   },
    // }),
    // new copyWebpackPlugin([
    //   {
    //     context: 'src/functions',
    //     from: '**/function.json',
    //     to: '',
    //   },
    // ]),
  ],
  node: {
    __filename: false,
    __dirname: false,
  },
}
