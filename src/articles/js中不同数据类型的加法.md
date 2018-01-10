---
title: js中不同数据类型的加法
date: 2017-09-27 17:15
tags: [js,数据类型]
---
<!-- deleteAbove -->
--------

### 前言
在js 中 有5中基础类型 undefined null boolean number string  和一种引用类型 object

不同类型之间的加法是怎么进行的呢 ？

<!-- more -->
ex:  a+b

### 步骤
1. 首先对加号两边的 a,b 进行  ToPrimitive()操作  转换成原始值 也就是 专门对于object的。如果是个原始值（基础类型）,直接返回，如是 object,
**先尝试valueOf()方法 ，如果返回的是原始值，就返回 ；如果不是，继续使用toString(),如果是原始值就返回 ，再不是就抛错(一般不会出现)**

也就是 ：  valueOf  >  toString  >  error


2. 接下来 等号两边都是原始值了，先看看有没有string类型的 如果有 那就把另一个也弄成string 然后字符串拼接

3. 如果都不是，就转成数字number类型 再相加




> 附表

各类型转 string

参数  | 结果
---|---
undefined  |	"undefined"
null  |	"null"
布尔值 |	"true"  或者 "false"
数字   |	数字作为字符串,比如. "1.765"
字符串  |	无需转换



各类型转 number

参数    |	结果
---|---
undefined   |	NaN
null    |	+0
布尔值  |	true被转换为1,false转换为+0
数字    |	无需转换
字符串  |	由字符串解析为数字.例如,"324"被转换为324


数组 和 对象的 valueOf

参数    |	结果
---|---
[1,2,3]   |	[1,2,3]
{a:"a"}    |	{a:"a"}

> 都会返回原值 除非，手动修改了对象的 valueOf 属性

数组 和 对象的 toString()
参数    |	结果
---|---
[1,2,3]   |	'1,2,3'
{a:"a"}    | "[object Object]"

> 对象都会返回"[object Object]"，包括空对象 {} ，  除非手动修改了对象的 valueOf 属性



### 题目
> 思考

```js

[]+[]

{}+{}  

{}+[]

[]+{}

({}+{})

```
### 另外

简单类型都放在栈（stack）里
对象类型都放在堆（heap）里
不同的对象是不等的所以有：
```js
[]==[]   // false

```
参考文章：
- [https://github.com/jawil/blog/issues/1]
