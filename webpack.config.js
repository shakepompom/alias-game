/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line
const { join, resolve } = require('path');
const Dotenv = require('dotenv-webpack');

const rootDir = join(__dirname, './');

module.exports = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  entry: {
    app: join(rootDir, './src/index.tsx'),
  },
  output: {
    path: join(rootDir, './public'),
    filename: './[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': resolve(rootDir, './src'),
      '@common': resolve(rootDir, './src/common'),
      '@components': resolve(rootDir, './src/common/components'),
      '@hooks': resolve(rootDir, './src/common/hooks'),
      '@utils': resolve(rootDir, './src/common/utils'),
      '@fb': resolve(rootDir, './src/common/firebase'),
      '@styles': resolve(rootDir, './src/common/styles'),
      '@features': resolve(rootDir, './src/features'),
      '@pages': resolve(rootDir, './src/pages'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
    }),
  ],
  devtool: 'source-map',
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  devServer: {
    port: 8000,
    contentBase: join(rootDir, './static'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
  },
};
