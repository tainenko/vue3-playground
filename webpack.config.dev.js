const path = require("path");
const {VueLoaderPlugin} = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require('webpack-node-externals')

module.exports = (env = {}) => ({
    mode: env.prod ? "production" : "development",
    devtool: 'inline-cheap-module-source-map',
    entry: [
        require.resolve(`webpack-dev-server/client`),
        path.resolve(__dirname, "./src/main.js")
    ].filter(Boolean),
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/dist/"
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, "./src"),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.png$/,
                use: {
                    loader: "url-loader",
                    options: {limit: 8192}
                }
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ],
    devServer: {
        inline: true,
        hot: true,
        stats: "minimal",
        contentBase: __dirname,
        overlay: true,
        injectClient: false,
        disableHostCheck: true
    },
    externals: [nodeExternals()]
});
