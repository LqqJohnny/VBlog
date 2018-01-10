---
title: js中的this
date: 2017-09-28 13:52
tags: [js,this]
---
<!-- deleteAbove -->

> this的指向，是在函数被调用的时候确定的，记住这句话有利于理解this


<!-- more -->

## 不同情况下有不同的取值

以下分为6种情况：

- this在全局范围内

- this在对象的构造函数内

- this在对象的方法内

- this在一个简单的函数内

- this在箭头函数内

- this在一个事件侦听器内

###  this在全局范围内

全局范围 this 指向两种情况：

浏览器 --> window  

nodejs--> global

### this在对象的构造函数内

```
function Man(name){
    this.name
}
var i = new Man("lqq");

```
 那这里的this 就是指向 i 的，每个实例都有自己的this，互不影响。

### This在对象的方法内

```
let o = {
    getName(){
        console.log(this.name);
    },
    name:"lqq"
}

o.getName() // "lqq"


```
这里的this 指的就是 o ，

### This在一个简单的函数内

在浏览器中, 简单函数里面的this总是被指向Window. 即使你在对象的方法中调用一个简单函数, 在这个简单函数里面的this也是指向Window.

```

function simpleFunction() {
    console.log(this);
}

var o = {
    sayThis() {
        simpleFunction(); // 如果把这句替换成console.log(this);那就输出的是 o
    }
}

simpleFunction(); // Window
o.sayThis(); // Window

```

### This在箭头函数中
this在箭头函数中总是跟它在箭头函数所在作用域的this一样(在它直接作用域).

以, 如果你在对象中使用箭头函数, 箭头函数中的this总是指向这个对象本身：
```
var o = {
    doSomethingLater() {
        setTimeout(() => this.speakLeet(), 1000);
    },
    speakLeet() {
        console.log(`1337 15 4W350M3`);
    }
}

o.doSomethingLater(); // `1337 15 4W350M3`

```
setTimeout本来里面的this是指向window的 这里是箭头函数，所以this被强行改成指向 o了

> 改变任何函数(方法)中的this值的方法还有bind, call或者apply.

### This在事件侦听器内

在事件侦听器内, this被指向的是触发这个事件的元素:



转自：[https://zhuanlan.zhihu.com/p/28704724]
