const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

const APP_NAME = require('./stack.config.js').name
const PORT = require('./stack.config.js').port
const NODE_ENV = process.env.NODE_ENV || 'development'
// const IS_DEV = NODE_ENV === 'development'

log('APP_NAME: ', APP_NAME)
log('NODE_ENV: ', NODE_ENV)

// 导出项目的 webpack 配置: vue inspect --mode development > config.js

module.exports = {
  publicPath: NODE_ENV === 'development' ? `http://localhost:${PORT}` : `./${APP_NAME}-app/`,
  css: { extract: false },
  productionSourceMap: false,
  outputDir: 'dist',

  chainWebpack: (config) => {
    // config.externals({
    //   vue: 'Vue',
    //   'element-ui': 'ELEMENT',
    //   moment: 'moment',
    //   vant: 'vant'
    //   // 'axios': 'axios',
    //   // 'lodash': '_',
    // })

    // 删除 vue-cli 默认的入口点
    config.entryPoints.delete('app')

    config
      .entry('main')
      .add('./src/main.js')
      .end()

    // 重新配置 vue-cli 的出口文件
    config.output
      .filename('[name].js')
      .chunkFilename('[name].[chunkhash:8].js')
      .jsonpFunction(`webpackJsonp-${APP_NAME}-[name]`)
      .library(`app-${APP_NAME}-[name]`)
      .libraryExport('default')
      .libraryTarget('umd')

    // 禁止 webpack 拆包, 保证 main.js 为唯一入口文件
    config.optimization.splitChunks(false)

    config.plugin('define').use(webpack.DefinePlugin, [{
      'process.env.VUE_APP_NAME': JSON.stringify(APP_NAME)
    }])

    config.plugins
      .delete('html')
      .delete('preload')
      .delete('prefetch')

    config
      .plugin('manifest')
      .use(ManifestPlugin)
  },

  devServer: {
    port: PORT
    // headers: {
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': '*',
    // },
  }
}

function log (label, content, options) {
  console.log('\x1b[1m%s\x1b[31m%s\x1b[0m', label, content)
}
