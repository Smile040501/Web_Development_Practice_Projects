const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    target: "web",
    entry: "./src/app.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
        clean: true,
    },
    // watchOptions: {
    //     // Required when working with WSL2 or move folder to WSL2 filesystem
    //     poll: true, //  Check for changes via `polling`
    //     ignored: /node_modules/,
    // },
    devtool: "inline-source-map",
    devServer: {
        static: path.resolve(__dirname, ""),
        compress: true,
        port: 3000,
        hot: true,
        open: true,
        devMiddleware: {
            index: true,
            serverSideRender: true,
            writeToDisk: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() /* When using webpack-dev-middleware*/,
    ],
};
