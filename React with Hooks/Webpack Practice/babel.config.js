module.exports = {
    presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }], "@babel/preset-react"],
    plugins: [
        "babel-plugin-syntax-dynamic-import",
        [
            "babel-plugin-named-asset-import",
            {
                loaderMap: {
                    svg: {
                        ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                    },
                },
            },
        ],
    ],
};
