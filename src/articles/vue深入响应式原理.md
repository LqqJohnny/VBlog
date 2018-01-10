---
title: vue深入响应式原理
date: 2017-10-9 15:23
tags: [vue,响应式,问题]
---
<!-- deleteAbove -->

## 深入响应式原理

现在的MVVM框架 基本都有响应式系统 ，数据的改变驱动着视图的改变，这种设计让状态管理变得非常简单
<!-- more -->
1.
![响应式原理](https://cn.vuejs.org/images/data.png)

2.
![响应式原理](http://static.galileo.xiaojukeji.com/static/tms/shield/vue-reactive.jpg)

### 原理解析
传给vue实例*data*的对象中存着所有实例初始化的变量，Vue会遍历这些属性并且对于每一个属性使用 *Object.defineProperty* 把这些属性全转换为*getter/setter*，这两个方法 **用户是无法调用的** ，只能在Vue内部，当某一个属性被修改，便会调用setter ，setter里面便会通知watcher，watcher会进一步的重新计算页面，然后调用render方法，修改virtual dom 再修改页面。
> watcher就像是一个中间人 ，将**更新页面**和**setter**连接起来。

详细的过程就是图2中的流程，通过Observer、Dep、Watcher、Directive将数据与视图连接起来.具体的描述请看        [这里](http://www.imooc.com/article/14466)


通过Watcher把上述两部分结合起来，即把Directive中的数据依赖通过Watcher订阅在对应数据的 Observer 的 Dep 上。当数据变化时，就会触发 Observer 的 Dep 上的 notify 方法通知对应的 Watcher 的 update，进而触发 Directive 的 update 方法来更新 DOM 视图，最后达到模型和视图关联起来。、


### 代码实现

vue的响应式原理主要是依赖了 **Object.defineProperty()** 方法。这就是 ie8及以下的浏览器不支持vue的原因。

接下来看看 vue将data转为可观察数据的方法的简单实现：
```js
function observer(value, cb) {
    Object.keys(value).forEach((key) => defineReactive(value, key, value[key] , cb))
}

function defineReactive (obj, key, val, cb) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: ()=>{
            /*....依赖收集等....*/
        },
        set:newVal=> {
            cb();/*回调*/
        }
    })
}

class Vue {
    constructor(options) {
        this._data = options.data;
        // 在初始化的时候调用 observe 将所有data 数据转为可观察（observable）的
        observer(this._data, options.render)
    }
}

let app = new Vue({
    el: '#app',
    data: {
        text: 'text',
        text2: 'text2'
    },
    render(){
        console.log("数据变化");
    }
})

```
首先将 data 赋值给_data，在将_data 通过 observe()方法重新定义，加上 **setter** 和 **getter**.
> 这个例子展示的只是 对于单个元素的监测  **数组**的监测会稍有不同，需额外方法 observeArray () 事实上也就是循环对数组每个元素 进行监测 请看[源码](https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js)


到这为止，_data的数据变成了响应式数据 但不是 vm.data ,所以这里还需要一个代理:
```js
_proxy(options.data);/*构造函数中*/

/*代理*/
function _proxy (data) {
    const that = this;
    Object.keys(data).forEach(key => {
        Object.defineProperty(that, key, {
            configurable: true,
            enumerable: true,
            get: function proxyGetter () {
                return that._data[key];
            },
            set: function proxySetter (val) {
                that._data[key] = val;
            }
        })
    });
}

```
这个代理的作用其实就在于给 data 也加上了 getter  和  setter  然后在它们里面 触发this._data的setter和getter方法。


**现在已经对data 加上监测了  那么监测到变化之后怎么触发视图更新呢？**

这里会涉及到几个 概念 ：
- dep
- watcher

Dep 类是一个简单的观察者模式的实现。

```js

export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }
  //在定义getter 时调用 添加到watcher
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  //......

  // 在setter时调用，数据改变 -> 遍历所有的订阅 Watcher，调用它们的 update 方法
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

```
subs 存储着所有的watcher，watcher 的方法看[这里](http://www.imooc.com/article/14468)


现在回过头看上面的两张图 应该更能理解了。

**问题:**
> 为什么不直接在data上面设置 setter 和 getter 呢？

#### 参考文章：
- [从源码角度再看数据绑定](https://github.com/answershuto/learnVue/blob/master/docs/%E4%BB%8E%E6%BA%90%E7%A0%81%E8%A7%92%E5%BA%A6%E5%86%8D%E7%9C%8B%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.MarkDown)

- [深入响应式原理](http://www.imooc.com/article/14466)
