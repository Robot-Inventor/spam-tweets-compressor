const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/main.ts"
    },
    output: {
        filename: "main.js",
        path: path.join(__dirname, "./dist")
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
