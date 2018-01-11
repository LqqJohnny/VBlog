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
└───static          静态资源（如 css，js , img）
└───articles.json   webpack 自动生成的关于文章的信息文件
└───blog.config.js  网站的配置文件，可设置网站名字 作者等信息
```

`npm run dev` 可实时编辑 文章查看结果

`npm run build` 可进行打包，成静态文件 ，再上传到github 并设置gitPage 即可看到博客。

编辑文章，请在 `src/articles` 里进行
