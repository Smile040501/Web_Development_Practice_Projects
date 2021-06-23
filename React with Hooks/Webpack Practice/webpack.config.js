const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        chunkFileName: "[id].js",
        publicPath: "",
    },
    resolve: {
        // will try to resolve the file imports with these extensions if not provided
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{ loader: "babel-loader" }],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    // Order matters
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                            localIdentName: "[name]__[local]__[hash:base64:5]",
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                autoprefixer({
                                    browsers: ["> 1%", "last 2 versions"],
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                // url-loader and file-loader
                use: [{ loader: "url-loader?limit=8000&name=images/[name].[ext]" }],
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
