---
title: 虚拟节点VNode
date: 2017-10-10 15:25
tags: [vue,VNode,虚拟节点,问题]
---
<!-- deleteAbove -->


Virtual DOM （虚拟树） 大幅减少了DOM操作带来的重计算步骤。
<!--more-->
通过将对真是dom的操作，现在虚拟dom上操作完 再将最后的结果 替换到真是dom上去 极大提升了效率，减少了开销。


## VNode

### VNode基类
一个VNode 对象其实和真是的dom对象很类似的，但是却比原生的Dom节点元素少了很多不必要的属性，这也是操作 VNode 比 操作真是dom元素 更快的原因之一，因为真是dom节点的属性多，遍历一次所需的时间也更多 ，然而在实际dom修改中，大部分的属性都是不需要的。

VNode 定义好之后，将会通过createElement方法 将其渲染成dom节点。

展示部分VNode的源码，

完整的源码在 [这里](https://github.com/vuejs/vue/blob/dev/src/core/vdom/vnode.js)

对于VNode的各个属性的解释看 [这里](https://github.com/answershuto/learnVue/blob/master/docs/VNode%E8%8A%82%E7%82%B9.MarkDown)


```js
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  //......

  // 构造函数
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
  // 初始化
    this.tag = tag
    this.data = data
    this.children = children
    // ......
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

可以看出 VNode其实就是一个存着 **定义一个dom元素需要的各种属性** 的 *对象*

举个例子：
```js
{
    tag: 'div'
    data: {
        class: 'test'
    },
    children: [
        {
            tag: 'a',
            data: {
                class: 'demo',
                href: '#'
            }
            text: 'click me'
        }
    ]
}
```
调用 createElement() 之后，渲染的结果将会是 ：
```html
<div class="test">
    <a class="demo" href="#">click me</a>
</div>

```

### VNode 的方法

接下来在看看 VNode的其他方法 ：

```js
// 创建一个空 VNode对象
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}

// 创建一个 文本对象
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}


// 复制一个VNode对象
export function cloneVNode (vnode: VNode, deep?: boolean): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.isCloned = true
  if (deep && vnode.children) {
    cloned.children = cloneVNodes(vnode.children)
  }
  return cloned
}
// 批量复制 VNode 本质是 循环调用  cloneVNode 方法
export function cloneVNodes (vnodes: Array<VNode>, deep?: boolean): Array<VNode> {
  const len = vnodes.length
  const res = new Array(len)
  for (let i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep)
  }
  return res
}

```
以上 是 VNode  的源码内容 很好理解

但是。。。

**多次提到 createElement()方法 好像并没有呀。。。**


其实  createElement 和 createComponent 已经被单独拿出来了 [链接](https://github.com/vuejs/vue/tree/dev/src/core/vdom)


> 问题

- 关于createElement ,createComponent 这两个方法还需要仔细的理解.
- 对于VNode的一些常用到的属性可以稍微熟悉一下


参考文章：

- [VNode节点-github](https://github.com/answershuto/learnVue/blob/master/docs/VNode%E8%8A%82%E7%82%B9.MarkDown)
- [对 virtual-dom 的一些理解](https://zhuanlan.zhihu.com/p/25630842)
