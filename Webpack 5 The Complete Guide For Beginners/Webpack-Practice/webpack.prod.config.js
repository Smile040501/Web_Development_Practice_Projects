const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // entry: "./src/index.js", // Where our original file exists which is main entry point
    entry: {
        helloWorld: "./src/helloWorld.js",
        smile: "./src/smile.js",
    },
    output: {
        filename: "bundle__[name]__[contenthash].js", // Output filename, gives a specific hash to output file name, make sure to add same file name to index.html, This is in order to force download new version of file each time in browser in production to prevent browser caching
        // [name] will take the name provided as key in entry object, (Default: index)
        path: path.resolve(__dirname, "dist"), // Absolute Path to output file directory
        publicPath: "/static/", // If we are importing some files dynamically/lazily we will get them as separate files in destination folder but while importing webpack will try to find those files in root folder, so provide this to inform webpack where to look for files
    },
    mode: "production", // Default: production, Options: development/production/none
    resolve: {
        // will try to resolve the file imports with these extensions if not provided
        extensions: [".js", ".jsx"],
    },
    devtool: "cheap-source-map", // Adding source map to easy debug in browser
    optimization: {
        // To extract common dependencies with code splitting
        splitChunks: {
            chunks: "all",
        },
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/, // Regular expression for files to look for
                exclude: /node_modules/, // Which files/folder not to process
                use: [
                    // Which loaders to use
                    "file-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"], // Webpack processes loaders from Right to Left
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // Which files/folder not to process
                use: {
                    loader: "babel-loader",
                    options: {
                        // Specifying extra options for loader
                        presets: ["@babel/env"], // Use modern JS
                        plugins: ["transform-class-properties"], // To support any modern feature find babel plugin and use it
                    },
                },
            },
            {
                test: /\.hbs$/,
                use: ["handlebars-loader"],
            },
        ],
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: "styles__[name]__[contenthash].css",
        }),
        new CleanWebpackPlugin(), // Automatically deletes content of output folder before generating new
        new HtmlWebpackPlugin({
            // Use it multiple times in case of multiple HTML pages
            filename: "helloWorld.html",
            chunks: ["helloWorld", "vendors~helloWorld~smile"], // Which bundle to link to
            title: "Hello World",
            description: "Hello World",
            template: "src/pageTemplate.hbs",
        }), // Automatically adds CSS and JS file paths in html tags
        new HtmlWebpackPlugin({
            filename: "smile.html",
            chunks: ["smile", "vendors~helloWorld~smile"],
            title: "Smile",
            description: "Smile",
            template: "src/pageTemplate.hbs",
        }), // Automatically adds CSS and JS file paths in html tags
    ], // Extra plugins to use with webpack
};
