/** @type {import('next').NextConfig} */
import CopyPlugin from "copy-webpack-plugin";

export default {
    experimental: {
        outputFileTracingIncludes: {
            '/api/**/*': ['./node_modules/**/*.wasm', './node_modules/**/*.proto'],
        },
    },
    basePath: '',
    restrictMode: false, // Add this line to disable restrict mode

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config

        const destWasmFolder = "."
        config.plugins.push(new CopyPlugin({
            patterns: [
                { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: destWasmFolder + "/static/chunks/app" },
            ]
        }));

        // Important: return the modified config
        return config;
    },
};
