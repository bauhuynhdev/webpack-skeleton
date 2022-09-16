const {resolve} = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const isProductionMode = process.env.NODE_ENV === "production";

module.exports = {
    mode: isProductionMode ? "production" : "development",
    watch: !isProductionMode,
    entry: "./src/index.js",
    output: {
        filename: "app.js",
        path: resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    outputPath: 'images/',
                    // filename: 'images/[hash][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    outputPath: 'fonts/',
                    // filename: 'fonts/[hash][ext]',
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer"
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ],
            },
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: {removeAll: true},
                        },
                    ],
                }
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "app.css"
        }),
        new HtmlWebpackPlugin({
            template: "./index.html",
            minify: false
        }),
        new CopyPlugin({
            patterns: [
                {from: resolve(__dirname, 'src/ace-builds/src-noconflict/worker-php.js'), to: "worker-php.js"},
                {from: resolve(__dirname, 'src/ace-builds/src-noconflict/snippets/php.js'), to: "snippets/php.js"},
            ],
        }),
    ],
    resolve: {
        alias: {
            Ace: resolve(__dirname, "src/ace-builds/src-noconflict/")
        }
    }
};