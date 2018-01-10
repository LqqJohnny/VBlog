---
title: Spring一些常用的注解
date: 2017-10-17 10:45
tags: [Spring,注解]
---
<!-- deleteAbove -->

注解，是spring的一大特色，功能十分强大，代码方便快捷。
<!--more-->
下面是 spring的 一些常用的注解关键词

#### @Controller

这个是最基础的 就是把一个 类 设置成一个 **控制器**.


#### @RestController
和 @Controller    类似，也是定义一个控制器,可以看成是结合了@ResponseBody与@Controller注解的功能。

这两个定义控制器方式的不同在于 ，两种控制器的返回数据格式不同。
Controller 返回的是jsp页面 可以说是String，而 RestController返回的json / xml 等其他格式的数据，RestController 为一些 Restful webservice 提供了便捷 ，能实现只提供数据的接口。

> 这两个注解一般放在class 前面，对整个class里面的接口生效。


#### @RequestMapping

用来 映射请求路径，不多bb，上例子：
```java
// 还可以加其他的参数
	@RequestMapping(value = "/index.htm", produces = "text/html;charset=UTF-8")
	public String index() {
		return "jsp/index";
	}
```

#### @PathVariable

从 路径里面取出参数 ，还是上例子比较易懂：
```java
	@RequestMapping(path="/test-{id}.htm")
	public String indexID(@PathVariable String id,Model model){
		model.addAttribute("id", id);
		return "jsp/index";
	}
```
当 输入地址``` /test-111.htm ```的时候，加入model的id 值 为 111


#### @RequestParam
为接口指定所需的参数 ，默认是必须的参数 ，也可以用参数改为非必须
```java
	@RequestMapping(value="/param.htm" , method = RequestMethod.GET )
	public String param(
			@RequestParam(value="id",required = false) String id ,
			@RequestParam("name") String name,
			Model model){

		model.addAttribute("id", id);
		model.addAttribute("name", name);
		return "jsp/index";
	}

```
在传参数的时候还有一种特殊情况，如果前端传的参数不确定，或者数量多，一个个的指定非常麻烦 ，这时候就用 Map吧
```java

	@RequestMapping(value="/mapParam.htm" , method = RequestMethod.GET )
	public String mapParam(
			@RequestParam Map<String, String> param,
			Model model){
		model.addAttribute("id", param.get("id"));
		model.addAttribute("name", param.get("name"));
		return "jsp/index";
	}
```

随便你传什么参数 ，我只从map里面取我需要的，没有就取到空 ，也不会报错

#### @SessionAttributes

这个是使用 session来保存数据的，通常的session的用法是通过 HttpSession 的实例来调用addAttribute() 来保存数据的 ，现在有了@SessionAttributes 便可以在类声明之前就指定 那几个字段需要保存到session：

```java
@Controller
@SessionAttributes("id")
public class indexController {
    @RequestMapping(value="/param.htm" , method = RequestMethod.GET )
	public String param(
			@RequestParam(value="id",required = false) String id ,
			@RequestParam("name") String name,
			Model model){

		model.addAttribute("id", id);
		model.addAttribute("name", name);
		return "jsp/index";
	}
}

```
在这个例子里面， id就被存入了session 而 name则没有被存入。

使用了 SessionAttributes ，在清除session的时候 就需要使用特定的方法：

    sessionStatus.setComplete();

这个方法只能清除掉 用SessionAttributes 定义过的字段，其他用HttpSession加入session的字段不会被清除。
```java
	@RequestMapping(value="/clearSession.htm")
	public String clearSession(
			SessionStatus sessionStatus){
		sessionStatus.setComplete();  //  清除 @sessionAttributes 标记的session属性值
		return "jsp/session";
	}
```


#### @CookieValue
有session 必然就有 Cookie了 ， 这个注解就是用来获取cookie里面的参数值的 ：
```java
	@RequestMapping(value="/getCookie.htm")
	public String getCookie(
			@CookieValue("JSESSIONID") String sessionID
			,Model model){
		model.addAttribute("id",sessionID);
		return "jsp/index";
	}
```


#### @RequestHeader
同上

```java
	@RequestMapping(value="/getReqHead.htm")
	public String getReqHead(
			@RequestHeader("Accept-Encoding") String encode
			,Model model){
		model.addAttribute("name",encode);
		return "jsp/index";
	}
```


【待补充】



> 参考
- [Spring MVC 4.2.4.RELEASE 中文文档 -2.3.3](https://linesh.gitbooks.io/spring-mvc-documentation-linesh-translation/content/publish/21-3/3-defining-@requestmapping-handler-methods.html)
