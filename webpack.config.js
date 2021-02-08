// webpack.config.js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    entry: './src/main.js',
    output: {
        filename: './bundle.js',
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env']
                    }
                },
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                  MiniCssExtractPlugin.loader,
                  'css-loader',
                  {
                    loader: 'sass-loader'
                  }
                ]
              }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(
          {
            filename: './bundle.css'
          }
        )
      ],
  devtool: 'source-map',
    resolve: {
        extensions: ['.js', '*']
    }
};
