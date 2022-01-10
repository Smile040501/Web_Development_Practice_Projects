const path = require("path");

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
    devtool: "inline-source-map",
    devServer: {
        static: path.resolve(__dirname, ""),
        compress: true,
        port: 3000,
        hot: true,
        open: true,
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
};
