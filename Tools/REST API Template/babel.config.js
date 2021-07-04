module.exports = {
    presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 3 }]],
    sourceType: "unambiguous", // so that 'require' is not converted to 'import'
};
