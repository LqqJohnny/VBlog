---
title: webpack配置各种loader
date: 2017-11-07 10:57:49
tags: [webpack]
---
<!-- deleteAbove -->

一些常见的 css ，js ，image 的loader配置。

小二 ， 上码 ！
<!-- more -->



### webpack.config.js
```js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 基础设置
    devtool: 'eval-source-map',  // 生成  Source Maps  便于调试，会输出详细的错误信息
    entry:  __dirname + "/app/main.js",//唯一入口文件
    output: {
        path: __dirname + "/dist",//打包后的文件存放的地方
        filename: "js/[name].js",//打包后输出文件的文件名
        // publicPath:"http://helloBitchs/",   // 打包之后在自动在引用的地方加前缀
    },
//  配置 server 实时应用修改更新并打包
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//true不跳转  false刷新页面
        port:"5200",
        hot: true,
        inline: true//实时刷新
    },
    //  loader   各种类型的loader 都在这里配置 css js img
    module: {
        loaders: [
            {       // js
                test: /\.js$/,
                // exclude: /node_modules/,
                include:/app/,
                loader: 'babel-loader',
                options: {
                    'presets': ['latest'],
                }
            },
            //  css
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'postcss-loader'
                ]
            },
            //  less    less-loader,less
            {
                test: /\.less$/,
                use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "postcss-loader"
                    }, {
                        loader: "less-loader" //注意顺序 要放最后面
                }]
            },
            //  sass / scss  和less 的配置差不多       sass-loader,node-sass
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            //  html
            {
              test: /\.html?$/,
              loader: 'html-loader',
            },
            {   // ejs 模板的loader  类似的模板loader还有很多 可在webpack官网查询
              test: /\.ejs?$/,
              loader: 'ejs-loader',  //  html中的图片
            },
            {   //  markdown-loader
                test: /\.md$/,
                loader:"html-loader!markdown-loader"
            },
            // {   // url-loader
            //     // 比file-loader 多了一个功能 ，可限制图片的大小，
            //     // 超过则是图片，不超则打包成base64
            //     test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            //     loader: 'url-loader?limit=5000&name=images/[name].[ext]'
            // },
            //
            // file-loader
            {   // css中和 html 中使用的图片 都会被loader处理
                //  !!但是模板中的图片不会被替换!! 解决办法就是 使用require 引入图片到模板文件
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                    }
                  }
                ]
              }
        ]
  },

    //  插件
    plugins: [
        new HtmlWebpackPlugin({                 //  打包后自动生成一个index.html 引用生成的js文件
            template: __dirname + "/public/index.html",// new 一个这个插件的实例，并传入相关的参数
            inject:"body",
            fileName:"index.html",
        })
    ]
}
```

### postcss 配置

可以使用很多个插件 具体插件配置 直接看[官方文档](https://github.com/michael-ciniawsky/postcss-load-config)。

postcss.config.js
```js
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserlist" field in package.json
    "autoprefixer": {}
  }
}


```
