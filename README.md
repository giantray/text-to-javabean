##introduce
the tool help you to generate javabean(pojo) by json.it is so strong that you will like it.enjoy it now at http://jsontojava.sinaapp.com/

##功能介绍
我们开发的java系统，经常需要调用其他系统的API。这些API的返回格式，往往都是json格式。这个小工具，可以帮助你把json格式的数据，转换成对应的javabean。以简化你手动拷贝粘贴json属性的工作。

##哪些人会收益
如果你需要调用第三方API,但面临以下情况：
1、API未提供JAVA SDK，映射到java的响应格式，要自己写
2、API提供了SDK，但SDK略重，不想折腾


##使用说明
马上使用本项目，请访问
http://jsontojava.sinaapp.com/
访问上面的网址，或下载git中的代码，打开index.html。页面如下图所示。默认会展示一个例子。

1、你可以在左边的输入框粘贴json数据
2、右边的框就会显示对应的javabean。
3、然后你可以复制右边的内容到你的项目中。
![上传图片](http://image.game.yy.com/o/cloudapp/25586759/170x170/201506-534396a6_9bf5_4939_88a0_9c490aea1fb8.png)

##支持特性
#### **自动识别属性值，目前可以识别int，double,string,date,boolean，数组等**
例如：
1、json格式```"created_at": "2012-05-23T08:00:58Z"```会被识别为Date类型，并生成属性```private Date createdAt```
2、识别数组
```json
{
   "tags":[
        {"count":2416,"name":"小王子"},
        {"count":1914,"name":"童话"},
        {"count":1185,"name":"圣埃克苏佩里"},
        {"count":863,"name":"法国"},
        {"count":647,"name":"经典"},
        {"count":597,"name":"外国文学"},
        {"count":495,"name":"感动"},
        {"count":368,"name":"寓言"}
        ]
}
```
会被转换为
```java
public class Example {

   private List<Tags> tags;


    public void setTags(List<Tags> tags) {
        this.tags = tags;
    }
    public List<Tags> getTags() {
        return tags;
    }
    
}
```

#### **自动将小写命名的属性，转换为驼峰命名**
create_at的属性名，将会被转成createdAt,且带上注解
```java
@JsonProperty("created_at")
private Date createdAt;
```

#### **如果json为数组，会自动识别数组中的第一个值**
如下面的例子，会判断到该json为数组，然后通过数组的第一个值来解析得到javabean
```json
[
        {
          "id": 1,
          "username": "john_smith",
          "email": "john@example.com"
        },
        {
          "id": 2,
          "username": "jack_smith",
          "email": "jack@example.com",
          "name": "Jack Smith"
        }
]
```

#### **支持一键复制到剪贴板**
![上传图片](http://image.game.yy.com/o/cloudapp/25586759/170x170/201506-269c004a_8006_406b_b9a5_d10d8a4d0fe7.png)

#### **当json解析出错时，显示出错的行**
![上传图片](http://image.game.yy.com/o/cloudapp/25586759/170x170/201506-7a737f94_da89_45be_928c_57ffb6c4426c.png)

#### **能够自动识别属性值为自定义类的情况**
值如下图中的images属性，它的值不是基本类型(string,int等)，而是自定义的数据结构
```json
{
    "id":"1003078",
    "images":{
        "small":"http:\/\/img1.douban.com\/spic\/s1001902.jpg",
        "large":"http:\/\/img1.douban.com\/lpic\/s1001902.jpg",
        "medium":"http:\/\/img1.douban.com\/mpic\/s1001902.jpg"
     }
}
```
针对这种自定义类，做了以下处理
1、属性的类型名称(类名），通过转换属性名得来。如下图，属性的类型为Imagas，就是把属性名images转为首字母大写得来
```java
public class Example {
   private String id;
   private Images images;
}
```
2、一并生成了自定义类的javabean
![上传图片](http://image.game.yy.com/o/cloudapp/25586759/170x170/201506-0ee9a601_8310_4cbc_a940_876ea050b89d.png)


##其他说明
- 一键上传功能，需要将本项目部署在服务器上才能使用

##
