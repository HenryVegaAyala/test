const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": path.resolve(__dirname, "src")
      }
    }
  }
};
