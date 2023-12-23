import path from "path";
import { Configuration, ProgressPlugin } from "webpack";
import CopyPlugin from "copy-webpack-plugin"


const config: Configuration = {
    mode: "development",
    entry: {
        content: './src/content.ts',
        worker: './src/worker.ts',
        devtools: './src/devtools.ts',
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, "./dist"),
        clean: true
    },
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' },
        ]
    },
    plugins: [
        new ProgressPlugin(),
        // new CopyPlugin()
    ]
}

export default config;
