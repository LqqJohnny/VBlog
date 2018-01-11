# SimpleBlogByVue

> a simple blog project based on Vue.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 目录

使用的vue-cli 生成的项目 ，故项目结构和 vue webpack项目结构类似



```
├───build    webpack 文件
├───config   配置文件
├───dist     打包之后的静态页面
│   └───static
│       ├───css
│       └───js
|   └───index.html   可直接访问 index.html 看到  
├───src
│   ├───articles   博客原文件 md
│   ├───assets
│   ├───components  博客主题模板
│   │   ├───common  通用组件
│   │   └───pages   页面（首页，文章页...）
│   └───router      路由管理
└───static          静态资源（如 css，js , img）博客中可直接应用该目录图片
└───articles.json   webpack 自动生成的关于文章的信息文件
└───blog.config.js  网站的配置文件，可设置网站名字 作者等信息
```

`npm run dev` 可实时编辑 文章查看结果

`npm run build` 可进行打包，成静态文件 ，再上传到github 并设置gitPage 即可看到博客。

## 编辑

编辑文章，请在 `src/articles` 里进行

在文章的开头，请务必 加上文件信息头，如下：
```
---
title: 文章的标题
date: 时间（例如：2017-11-07 10:57:49  可以在编辑器上安装插入时间戳的插件）
tags: [tag1,tag2]
---
```
编写完成之后，在打包过程中，webpack 会在上述的文章信息头后加上一个标识
`<!-- deleteAbove -->`
用于在渲染页面时 不显示信息头。
所以，在看到这一段 注释 的时候不要删除，并不会影响文章效果。

## 配置网站信息

在根目录下的 `blog.config.js` 中可以设置网站的信息，如：
```js
site:{
  title: 199,
  subtitle: '面试造火箭，上岗拧螺丝',
  description: ' --- 它在我的机器上可以很好运行！',
  author: 'lqq',
  email:'*****@qq.com'
},
footer:{
  url:"https://github.com/LqqJohnny/SimpleBlogByVue",
}
```
暂时只加了这些信息 ，也可根据需要自行添加信息，并在components里面编辑模板，添加到想展现信息的地方。

## 代码高亮
 代码高亮使用的是 highlight.js 使用的颜色主题是 `gruvbox-light` 如果想修改请在 `blog.config.js` 中修改 highlightTheme ，可选的值可在highlight 官网查看,注意主题不再使用驼峰法。

## 博客插入图片

在博客中经常需要加入图片 ，把图片放入 static 静态文件夹中 在博客中直接以相对路径引入，如：
`![图片](../../static/cat.jpg)` 。 具体的路径视情况而定。
