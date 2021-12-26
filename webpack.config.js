const path = require("path");

module.exports = {
    mode: "production",
    devtool: false,
    entry: {
        "advanced_setting/script.js": "./src/ts/advanced_setting/advanced_setting.ts",
        "browser_action/script.js": "./src/ts/browser_action/browser_action.ts",
        "common/i18n.js": "./src/ts/common/i18n.ts",
        "main.js": "./src/ts/main/main.ts"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "[name]"
    }
};
