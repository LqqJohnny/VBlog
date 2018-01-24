# VBlog

> a simple blog project based on Vue.

## 安装运行

以下提供两种方式：

- 方式 1： git clone

``` bash
git clone https://github.com/LqqJohnny/VBlog.git

# then install dependencies
cd VBlog  && npm install

# serve with hot reload at localhost:8000
npm run dev
```

- 方式 2 (推荐)： vblog-cli

```bash
# install vblog-cli :  https://github.com/LqqJohnny/vblog-cli
npm install -g vblog-cli

# init your blogProject
vblog init myBlog

# then install dependencies
cd VBlog  && npm install

# serve with hot reload at localhost:8000
npm run dev

```

> 推荐使用方式2 ，vblog还有添加博客、删除博客和添加主题等指令，十分方便日后对于博客的修改。

## 目录

本项目借鉴了 `vue` 的 `webpack` ,稍加修改 ， 将博客打包成静态文件。


```
|───articles   博客原文件 md
|───res   博客原文件中引用的资源(图片...)
|   └───recycleBin  文章回收站
├───build    webpack 文件
├───config   配置文件
├───dist     打包之后的静态页面
│   └───static
│       ├───css
│       └───js
|   └───index.html   可直接访问 index.html 看到  
├───theme    主题模板文件  （默认主题、安装的新主题）
│   └───default   默认主题
│       ├───components  博客主题模板
│       │   ├───common  通用组件
│       │   └───pages   页面（首页，文章页...）
│       └───router      路由管理
└───static          静态资源
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

## 博客主题

主题文件夹 `theme` 每个文件夹对应一个主题，要修改主题可在 blog.config.js 中修改`blogTheme`字段的值为对应文件夹的名称，重启服务器或者重新打包，即可看到主题更换。
