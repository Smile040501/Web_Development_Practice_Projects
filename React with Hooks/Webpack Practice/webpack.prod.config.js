const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const safePostCssParser = require("postcss-safe-parser");

module.exports = {
    mode: "production",

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "static/js/[name].[contenthash:8].js",
        chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
        publicPath: "",
        assetModuleFilename: "static/media/[name].[hash:8].[ext]",
        clean: true,
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: { ecma: 8 },
                    compress: { ecma: 5, comparisons: false, inline: 2 },
                    mangle: { safari10: true },
                    output: { ecma: 5, comments: false, ascii_only: true },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    parser: safePostCssParser,
                    map: {
                        // `inline: false` forces the sourcemap to be output into a
                        // separate file
                        inline: false,
                        // `annotation: true` appends the sourceMappingURL to the end of
                        // the css file, helping the browser find the sourcemap
                        annotation: true,
                    },
                },
                cssProcessorPluginOptions: {
                    preset: ["default", { minifyFontValues: { removeQuotes: false } }],
                },
            }),
        ],
        splitChunks: {
            chunks: "all",
        },
    },

    resolve: {
        extensions: [".js", ".jsx"],
    },

    devtool: "source-map",

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(png|jpe?g|gif|bmp)$/i,
                type: "asset",
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: [{ loader: "babel-loader" }],
            },
            {
                test: /\.css$/i,
                exclude: [/node_modules/, /\.module\.css$/i],
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: {} },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" },
                ],
            },
            {
                test: /\.module\.css$/i,
                exclude: /node_modules/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIdentName: "[name]__[local]__[hash:base64:5]",
                            },
                            importLoaders: 1,
                        },
                    },
                    { loader: "postcss-loader" },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            filename: "index.html",
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
    ],
};
