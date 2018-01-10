---
title: hexo设置canvas背景
date: 2017-11-13 11:11:46
tags: [hexo]
categories: hexo
---
<!-- deleteAbove -->
### hexo 设置canvas背景

使用hexo 都会需要使用一个主题 theme ，不同的主题可能会内置不同的背景图片，
以 NEXT 主题为例，相信其他的主题的背景 设置应该是一样的。

<!-- more -->

#### NEXT 自带背景

在主题文件夹 hexo-theme-next  里面 有一个_config.yml 配置文件 在这里面 搜索 canvas_nest  可以看到下面 后面设置的是 false ，下面还有 好几个一样的设置，这些都是 NEXT 已有的背景，可以改为 true 来设置想要的背景 动画。


#### 定制背景动画

1. 紧接上面，在 _config.yml 文件 另加一个配置，例如：
```
color-ribbon: true
```
2. 在  source/lib 里面 添加一个文件夹以及对应的画canvas背景的js， 例如 color-ribbon/color-ribbon.js

3. 在layout/_scripts/vendors.swig 里面搜 canvas_nest，然后把那一段 if 复制 一份 改成 color-ribbon

```js
{% if theme.color_ribbon %}
  {% set js_vendors.color_ribbon  = 'color-ribbon/color-ribbon.js' %}
{% endif %}
```
然后 就可以在页面上看到效果了。


**注意**：

> 创建 canvas 元素，添加css样式并添加入body的操作尽量用js，不然还需要修改 公共样式和common.swig 比较繁琐，也容易产生冲突。

> 最后提供一些 canvas背景素材 ， 需要自己审查代码，找到其中的js文件  [canvas背景素材](http://www.jq22.com/)
