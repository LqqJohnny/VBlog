---
title: solr的简单使用-查询
date: 2017-12-22 10:01:07
tags: [solr,java]
categories: solr
---
<!-- deleteAbove -->

好久没写博客了 ，出差真是不太适合我这样的宅男。

<!-- more -->

### Start
前几天公司要写一个独立的 LBS 服务，用于另一个项目，Location Based Service  基于位置服务，提供地理位置信息，目前的需求是 ：

1. 根据名字获取地点坐标
2. 获取坐标周围的地点信息

地理位置信息量一共有1500多万条，这还是我第一次接触到这么多的数据，最终选择了用solr来存取，因为 solr 可以很方便的用来获取某个地点附近地点查找 和范围查找等。

对于没接触过solr的我来说 ，这也是一个挑战了 ， 网上能找到的 教程或者文档 还是很少的，因此只能一点点的看官方英文文档了。

还是一如既往的选择了 spring 公司目前的项目也全都是用它 ，所以也没有其他选择了。

#### solr的基本使用

首先，在pom中加入这两个 jar包,solrj 的版本如果是6以上的话可能会遇到报错：
```xml
<dependency>
	<groupId>org.springframework.data</groupId>
	<artifactId>spring-data-solr</artifactId>
	<version>2.1.3.RELEASE</version>
</dependency>
<dependency>
	<groupId>org.apache.solr</groupId>
	<artifactId>solr-solrj</artifactId>
	<version>5.5.2</version>
</dependency>

```
然后，配置 application.xml：
```xml
<!-- 加载solr的属性配置文件 -->
<context:property-placeholder location="classpath:solr.properties" ignore-unresolvable="true"/>

<!-- spring连接solr查询company数据库的配置 -->
<solr:solr-client id="geoQuery" url="${solr.geoSearchUrl}"/>

<solr:repositories base-package="com.lqqppl.solr.impl" solr-template-ref="geoQueryTemplate"/>

<bean id="geoQueryTemplate" class="org.springframework.data.solr.core.SolrTemplate">
    <constructor-arg index="0" ref="geoQuery"></constructor-arg>
</bean>
```
还有上面配置里需要的  solr.properties
```xml
solr.geoSearchUrl=http://ip:port/solr/
```
尝试过把solr里对应的库民直接在这指定 但是会报错，原因还没找到，所以只能在代码里指定库名。

接下来我写了一个 test测试类 来测试 solr的 模糊搜索和附近地点搜索：

```java

public class TestQuerySolr {

	public static void main(String[] args)
	{
		ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
	    SolrTemplate geoQueryTemplate= (SolrTemplate) ac.getBean("geoQueryTemplate");

//	    query(geoQueryTemplate);

	    near(geoQueryTemplate);

	}
	public static void query(SolrTemplate geoQueryTemplate){

		Criteria criteria = new Criteria("name");
		criteria.is("lqqppl");  // 相当于 where name = 'lqqppl'

	    SimpleQuery query = new SimpleQuery();
	    query.addCriteria(criteria);
	    System.out.println(geoQueryTemplate.queryForPage("geo",query,GeoPosition.class).getContent().get(0).getLocation());
	}

	public static void near(SolrTemplate geoQueryTemplate){
		SimpleQuery query = new SimpleQuery("*:*");
		FilterQuery fq = new SimpleFilterQuery(new Criteria("location")
				  .near(new Point(45.6504795,-111.0502501), new Distance(5)));
		query.addFilterQuery(fq);
//		query.addSort(new Sort(Direction.ASC,"category"));
//		query.addGroupByField("category");
//		query.setOffset(10);
//		query.setRows(20);  //  设置 返回的数量的长度
		Page<GeoPosition> res = geoQueryTemplate.queryForPage("geo", query, GeoPosition.class);
		System.out.println(JSONArray.fromObject(res.getContent()));
	}
}

```

在查询中还可以给query 添加很多筛选条件  排序、groupBy、分页等功能。

#### SimpleQuery 和 SimpleFilterQuery 的区别：

SimpleQuery一般用于固定的条件 如 type=1;
SimpleFilterQuery一般用于参数变化的 筛选 ，如传进了一个参数 name，要选出 username= name 的 那就用 SimpleFilterQuery。

### END
最后 ，给出一些最近找到的一些 solr关于 LBS 方面的文章与文档：
> 文章

[基于Solr的控件搜索](http://itindex.net/detail/41691-solr-%E7%A9%BA%E9%97%B4-%E6%90%9C%E7%B4%A2)
[solr空间搜索实现附近酒店的搜索](http://blog.csdn.net/awj3584/article/details/11760757)
[如何使用Spring Data Solr搜索引擎进行开发](http://blog.csdn.net/likemebee/article/details/78469002)
[使用 Apache Lucene 和 Solr 进行位置感知搜索](https://www.ibm.com/developerworks/cn/java/j-spatial/)
> 文档

[Solr Wiki Solrj](https://wiki.apache.org/solr/Solrj)
[Spring Data Solr](https://docs.spring.io/spring-data/solr/docs/2.1.3.RELEASE/api/)
[Spring Data for Apache Solr](https://docs.spring.io/spring-data/solr/docs/3.0.2.RELEASE/reference/html/)
