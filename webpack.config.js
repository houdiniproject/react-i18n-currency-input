const {
  basename, dirname, join, relative, resolve, normalize
} = require('path')
var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'reactI18nCurrencyInput',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: [/node_modules/, /src\/.+\.spec\..+/, /src\/.+\.stories\..+/, /examples/],
        loader: 'ts-loader'
      }

    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  optimization: {
    runtimeChunk: true
  },
  resolve: {

    extensions: [".js", ".json", ".jsx", ".ts", ".tsx",],
  },
  externals: {
    'lodash': {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_"
    },
    'lodash/isInteger': {
      commonjs: "lodash/isInteger",
      commonjs2: "lodash/isInteger",
      amd: "lodash/isInteger",
    },

    "react": {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React"
    },

    "react-use": {
      commonjs: "react-use",
      commonjs2: "react-use",
      amd: "react",
    }
  }
};
