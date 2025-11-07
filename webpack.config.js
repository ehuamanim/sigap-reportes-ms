// webpack.config.js
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/lambda.ts',
  target: 'node',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback:{
      "pg-native": false
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/domain/queries/sql/**/*.sql',
                    to({context, absoluteFilename}) {
                        const rel = path.relative(path.join(context, 'src', 'domain', 'queries', 'sql'), absoluteFilename);
                        return `src/domain/queries/sql/${rel}`;
                    },
                },
            ],
        }),
    ]
}