const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  },

  pwa: {
    workboxPluginMode: 'GenerateSW',
    // workboxOptions: {
    //   skipWaiting: true,
    //   clientsClaim: true,
    // },
  },
});
