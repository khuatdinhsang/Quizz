const path = require("path")

module.exports = {
    mode: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
    reactScriptsVersion: "react-scripts",
    style: {
        sass: {
            loaderOptions: {
                sassOptions: {
                    includePaths: ["node_modules", "src/assets"],
                },
            },
        },
        postcss: {
            plugins: [require("postcss-rtl")()],
        },
    },
    webpack: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@assets": path.resolve(__dirname, "src/@core/assets"),
            "@components": path.resolve(__dirname, "src/@core/components"),
            "@layouts": path.resolve(__dirname, "src/@core/layouts"),
            "@redux": path.resolve(__dirname, "src/redux"),
            "@styles": path.resolve(__dirname, "src/@core/scss"),
            "@configs": path.resolve(__dirname, "src/configs"),
            "@utils": path.resolve(__dirname, "src/utility/Utils"),
            "@hooks": path.resolve(__dirname, "src/utility/hooks"),
            "@views": path.resolve(__dirname, "src/views"),
            "@constants": path.resolve(__dirname, "src/@core/constants"),
            "@helpers": path.resolve(__dirname, "src/@core/helpers"),
            "@actions": path.resolve(__dirname, "src/redux/actions"),
        },
    },
}
