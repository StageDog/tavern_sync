import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  (_env: any, argv: any): webpack.Configuration => ({
    experiments: {
      outputModule: true,
    },
    devtool: argv.mode === 'production' ? false : 'eval-source-map',
    entry: './src/client/index.ts',
    target: 'browserslist',
    output: {
      devtoolModuleFilenameTemplate: 'webpack://tavern_helper_template/[resource-path]?[loaders]',
      filename: `script.js`,
      library: {
        type: 'module',
      },
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              resourceQuery: /raw/,
              type: 'asset/source',
            },
            {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
              exclude: /node_modules/,
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          extensions: ['.ts', '.js'],
          configFile: path.join(__dirname, 'tsconfig.client.json'),
        }),
      ],
      alias: {},
    },
    plugins: [],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({ terserOptions: { format: { quote_style: 1 } } })],
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            name: 'default',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
    externals: [
      ({ context, request }, callback) => {
        if (!context || !request) {
          return callback();
        }

        if (
          request.startsWith('http') ||
          request.startsWith('@') ||
          request.startsWith('.') ||
          request.startsWith('/') ||
          path.isAbsolute(request) ||
          fs.existsSync(path.join(context, request)) ||
          fs.existsSync(request)
        ) {
          return callback();
        }

        const builtin = {
          lodash: '_',
          toastr: 'toastr',
          yaml: 'YAML',
          jquery: '$',
          zod: 'z',
        };
        if (request in builtin) {
          return callback(null, 'var ' + builtin[request as keyof typeof builtin]);
        }
        return callback(null, 'module-import https://testingcf.jsdelivr.net/npm/' + request + '/+esm');
      },
    ],
  }),
  (_env: any, argv: any): webpack.Configuration => ({
    devtool: argv.mode === 'production' ? false : 'source-map',
    entry: './src/server/index.ts',
    target: 'node',
    output: {
      devtoolModuleFilenameTemplate: info => {
        return `${path.relative(path.join(__dirname, 'dist'), info.resourcePath)}${
          info.loaders ? `?${info.loaders}` : ''
        }`;
      },
      filename: `tavern_sync.js`,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              resourceQuery: /raw/,
              type: 'asset/source',
            },
            {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
              exclude: /node_modules/,
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          extensions: ['.ts', '.js'],
          configFile: path.join(__dirname, 'tsconfig.server.json'),
        }),
      ],
      alias: {},
    },
    optimization: {
      minimize: false,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            name: 'default',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  }),
  (_env: any, argv: any): webpack.Configuration => ({
    devtool: argv.mode === 'production' ? false : 'source-map',
    entry: './src/type/index.ts',
    target: 'node',
    output: {
      devtoolModuleFilenameTemplate: info => {
        return `${path.relative(path.join(__dirname, 'dist'), info.resourcePath)}${
          info.loaders ? `?${info.loaders}` : ''
        }`;
      },
      filename: `schema.js`,
    },
    module: {
      rules: [
        {
          oneOf: [
            {
              resourceQuery: /raw/,
              type: 'asset/source',
            },
            {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
              exclude: /node_modules/,
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          extensions: ['.ts', '.js'],
          configFile: path.join(__dirname, 'tsconfig.type.json'),
        }),
      ],
      alias: {},
    },
    optimization: {
      minimize: false,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
          },
          default: {
            name: 'default',
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
    },
  }),
];
