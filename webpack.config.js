const path = require("path");

module.exports = {
    mode: "development",
    devtool: false,
    entry: {
        advanced_setting: "./src/advanced_setting.ts",
        browser_action: "./src/browser_action.ts",
        i18n: "./src/i18n.ts",
        main: "./src/main.ts"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};
