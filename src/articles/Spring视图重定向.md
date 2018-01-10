---
title: Spring 视图重定向
date: 2017/10/17 下午5:56:46
tags: [Spring,重定向]
---
<!-- deleteAbove -->

Spring 视图重定向 推荐两个用法：
- forward
- redirect

来看看这个两个方式的同与异
<!--- more-->

## Spring视图重定向

### redirect

```javascript
@RequestMapping(value = "redirect.htm")
public String home(){
	return "redirect:index.htm";
}
```

原理：controller 返回的视图名中有  *redirect:*   这个前缀就会被检测到，其后面的 url地址 会被解析成重定向url。然后会发送一个写信息给 客户端(浏览器)，告诉它要重定向到这个地址去。

所以，这是一个**客户端行为** .


### forward

```javascript
@RequestMapping(value = "forward.htm")
public String home1(){
	return "forward:index.htm";
}

```
代码是一样的，效果也是一样的。但是原理是不一样的 ：

forward是服务器请求资源,服务器直接访问目标地址的URL,把那个URL的响应内容读取过来,然后把这些内容再发给浏览器.浏览器根本不知道服务器发送的内容从哪里来的,所以它的地址栏还是原来的地址。

这是一个 **服务器行为**


### 总结

#### 同
- 效果相同，看到的视图一样

#### 异
- 原理不同 ，forward是服务器行为  redirect是客户端行为
- 地址栏显示地址不同 ，redirect显示的是网页真是的地址，forward 显示的就是当前控制器匹配到的地址。


forward就像我现在写的这个笔记一样，我不告诉你这里的部分内容摘自哪里。
我把部分原文内容抄过来 ，自己还可以做一些修改。

redirect 就像我直接给你一个地址 ，你直接去他那个地址了，和我无关了。



> *2017/10/18 上午9:45:12 -- 哞 *
