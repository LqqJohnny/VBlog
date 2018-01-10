---
title: solr的简单使用-插入
date: 2017-12-22 10:42:53
tags: [solr,java]
categories: solr
---
<!-- deleteAbove -->

紧接上条博客，加上 插入数据的代码。

<!-- more -->
solr的配置在上篇文章已经写了。
直接看代码吧 ：
```java
public class insertData {
	public static void main(String[] args)
	{
	    BufferedReader br = null;
	    ApplicationContext ac = new ClassPathXmlApplicationContext("applicationContext.xml");
	    SolrTemplate geoQueryTemplate= (SolrTemplate) ac.getBean("geoQueryTemplate");
	    String filePath = "C:\\Users\\userlqq\\Desktop\\aa.csv";
	    String connection = "geo";  
	    try
	    {
	    	DataInputStream csv = new DataInputStream(new FileInputStream(new File(filePath)));
	        br = new BufferedReader(new InputStreamReader(csv,"GBK"));
	    } catch (FileNotFoundException | UnsupportedEncodingException e)
	    {
	        e.printStackTrace();
	    }
	    String line = "";
	    try {
	            int all = 0;
	            int n = 10000;
	            List<GeoPosition> ls = new ArrayList();
	            while ((line = br.readLine()) != null)  //读取到的内容给line变量
	            {
	            	// 处理数据
	                String[] lineInfo = line.split("\\|");
	                if(lineInfo.length < 5){
	                	System.err.println("出错了："+line);
	                	continue;
	                }
	                GeoPosition a = new GeoPosition();
	                a.setCategory(lineInfo[0]);
	                a.setId(lineInfo[1]);
	                a.setLocation(lineInfo[2]+","+lineInfo[3]);
	                a.setName(lineInfo[4].endsWith(",") ? lineInfo[4].substring(0, lineInfo[4].length()-1) : lineInfo[4]);
	                a.setPosition(lineInfo[2]+","+lineInfo[3]);
	                //  存储
	                ls.add(a);
	                //  每  n 个 插入一次
	                if(ls.size()==n){
//	                	System.out.println("commit一次,目前总数:"+all);
	                	geoQueryTemplate.saveBeans(connection, ls);
	                    geoQueryTemplate.commit(connection);
	                    ls.clear();
	                }
	                all++;
	            }
	            if(ls.size()>0){
	            	System.out.println("最后一次:"+ls.size());
	            	geoQueryTemplate.saveBeans(connection, ls);
	                geoQueryTemplate.commit(connection);
	            }
	            System.out.println(all+"条数据已经插入完成！");
	    } catch (IOException e)
	    {
	        e.printStackTrace();
	    }
	}
}
```
**流程**

首先读取excel文件 用while循环 将每条记录稍加处理后存入bean ，在将bean存入临时数组，当数组长度到达10000的时候 ，进行一次 批量导入（saveBeans） 在清空数组，重新填充。这样能极大的加快插入速度

在这里遇到了几个错误 ，都是url地址的问题 最终 在 saveBeans和commit方法都指定了 库名 才解决了问题。

如果遇到问题 ，请再三确认请求的地址是否错误。

接下来就可以去solr 的 web页面查看有没有数据了。
