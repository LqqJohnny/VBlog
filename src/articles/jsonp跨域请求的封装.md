---
title: jsonp跨域请求的方法封装
date: 2017-09-27 15:38
tags: [js,jsonp]
---
<!-- deleteAbove -->

talk is cheap ,show me your code!


<!--more-->

```js
function jsonp (options) {
    let url = options.url
    let data = options.data

    let oBody = document.getElementsByTagName('body')[0]
    let oScript = document.createElement('script')

    let callbackName = 'cb' + (~~(Math.random()*0xffffff)).toString(16)
    window[callbackName] = function (result) {
        options.success(result) ; //  将传入的success 方法存入window
    }
    data[options.callback] = callbackName

    oScript
        .setAttribute('src', url + '?' + format(data))
    oBody.append(oScript)

    function format(data) {
        let str = ''
        for (var p in data) {
            str += encodeURIComponent(p) + '=' + encodeURIComponent(data[p]) + '&'
        }
        return str
    }
}
```


例子：
```js
jsonp({
    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
    type: 'get',
    data:{
        wd: 'jsonp'
    },
    callback: 'cb',
    success: function (data) {
         console.log(data)
     }
});

```

实现jsonp有三种方法 但是其实实质是一样的 ，都是利用script的跨域请求能力。
（都需要后端进行配合，将callback和数据拼接成string）
1. 直接用script标签 在请求地址后面加上callback参数 ，在这之前必须先定义改callback函数
2. 使用上面的封装的方法 动态创建一个script标签
3. 使用jquery 的ajax方法 ，设置参数 dataType:'jsonp',jsonocallback之类的参数 就可以了 ，其实质也是创建一个script标签 和2一样。
