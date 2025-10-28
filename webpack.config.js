// webpack.config.js
const path = require('path');

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