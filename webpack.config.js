var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './examples/index.tsx',
    output: {
        path: path.resolve(__dirname, 'examples'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            
            { test: /\.tsx?$/, 
            loader:"ts-loader"
        }
            
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: './examples'
    },
    stats: {
        colors: true
    },
    devtool: 'inline-source-map',
    resolve: {
   
      extensions: [".js", ".json", ".jsx", ".ts", ".tsx",],
    }
};
