const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",

    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "build"),
        filename: "static/js/bundle.js",
        chunkFilename: "static/js/[name].chunk.js",
        publicPath: "",
        assetModuleFilename: "static/media/[name].[hash:8].[ext]",
        clean: true,
    },

    resolve: {
        extensions: [".js", ".jsx"],
    },

    devtool: "source-map",
    devServer: {
        contentBase: path.resolve(__dirname, "build"),
        hot: true,
        port: 3000,
        writeToDisk: true,
    },

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
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "postcss-loader" },
                ],
            },
            {
                test: /\.module\.css$/i,
                exclude: /node_modules/,
                use: [
                    { loader: "style-loader" },
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
    ],
};
