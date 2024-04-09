/** @type {import('next').NextConfig} */
import CopyPlugin from "copy-webpack-plugin";

export default {
    experimental: {
        outputFileTracingIncludes: {
            '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.proto'],
        },
    },
    basePath: '',
    restrictMode: false,
    assetPrefix: '',

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        const destWasmFolder = "."
        config.plugins.push(new CopyPlugin({
            patterns: [
                { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: destWasmFolder + "/static/chunks/app" },
            ]
        }));
        config.plugins.push(new CopyPlugin({
            patterns: [
                { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: destWasmFolder + "/static/chunks/" },
            ]
        }));
        return config;
    },
};
