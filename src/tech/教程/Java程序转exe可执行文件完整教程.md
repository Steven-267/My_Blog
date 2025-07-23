---
title: Java程序转exe可执行文件完整教程
date: 2024-10-09
category:
  - 技术教程
tag:
  - Java
  - exe4j
  - inno setup
  - 程序打包
  - 部署
author: Steven267
isOriginal: true
---

# Java程序实现exe转化

## 前言

公司给了一个需求，要求写一个工具，来实现rsa非对称加密鉴权，来实现不通过网络传输加密过程，来鉴权修改密码，用户通过在本地使用我的工具搭配私钥和新密码，可以实现生成签名，加密完成以后，需要封装成程序，方便以后用户部署本地使用。

RSA鉴权加密修改密码，仓库已上传github：<https://github.com/Steven-267/rsa>

## Java实现exe

我也是第一次接触java转exe的东西，更何况我用的是mac，这就更加增加我的难度了，这个在后面也有印证，现在大部分都是使用exe4j来实现jar包转成exe程序，但是这个exe程序有个缺点，就是你的程序运行的主机必须有jre，没有jre程序还是跑不了，那么我们必须集成jre和我们的初始exe，这时候就需要使用inno setup这个软件了，但是这个软件支持windows版本，所以我在mac上使用docker desktop拉取了一个镜像，准备在docker中跑这个inno setup，结果iss的脚本文件一直报错，无奈只好抢同事的windows电脑，来实现集成的步骤。

## jar包转exe程序

要实现jar包转exe，我们需要使用exe4j，可以直接谷歌下载，然后记得填一下注册码就可以，这里注册码随便上网找一个，我这里随便找了一个参考：L-g782dn2d-1f1yqxx1rv1sqd。

![请添加图片描述](https://i-blog.csdnimg.cn/direct/7a5d4059038142af8aed788d572476ca.png)

![请添加图片描述](https://i-blog.csdnimg.cn/direct/ba10f933055f4b1dae758994d3dd5ea8.png)

![请添加图片描述](https://i-blog.csdnimg.cn/direct/024f15383462407f9e61b5bccf8d315a.png)

![请添加图片描述](https://i-blog.csdnimg.cn/direct/2a92b6f9a5724f8fa7b02c18852187b2.png)

这里需要选择64b

![请添加图片描述](https://i-blog.csdnimg.cn/direct/6f74c2da800c4059a6d0068717027d09.png)

![请添加图片描述](https://i-blog.csdnimg.cn/direct/656cb04024824c5d95002f478183303f.png)

![请添加图片描述](https://i-blog.csdnimg.cn/direct/bd63709d0a50450c95b8a1bffcd6a631.png)

![请添加图片描述](https://i-blog.csdnimg.cn/direct/aa9bcd478e3246b89272e173c94b242e.png)

![请添加图片描述](https://i-blog.csdnimg.cn/direct/4ecb229055534a1aae39f7b917c85aa6.png)

![请添加图片描述](https://i-blog.csdnimg.cn/direct/480cc99e83124f1eae510b03e8053426.png)

下面就一直点下一步就可以了

![请添加图片描述](https://i-blog.csdnimg.cn/direct/8a11cd8a60584082abfd1b663865c124.png)

在之前定义的output路径，就可以找到我们的exe，但是这个exe有一个**缺陷**，就是运行程序的主机必须有jre的环境才可以运行，这就限制了我们程序的灵活性，所以我们需要集成jre的依赖到我们的exe。

## exe集成依赖

依赖集成我们这里使用的是inno setup，这个软件只支持windons系统，使用mac搭建很容易出现问题，建议使用windows虚拟机进行搭建。或者可以抢你同事的windons电脑

官网下载inno setup 

![请添加图片描述](https://i-blog.csdnimg.cn/direct/6e6de0d897d44bbc8cd6ffa8982bf26e.png)

一直点击下一步直到这个界面

![请添加图片描述](https://i-blog.csdnimg.cn/direct/e3b1cc7f4174449a9d641ea87f629eff.png)

一直下一步到

![请添加图片描述](https://i-blog.csdnimg.cn/direct/5b0a6e02d5a9471282ffed2e87c38637.png)

一直下一步到结束的前一步

配置到最后一步的时候，会问你是否立刻执行脚本，此时我们的jre路径并没有指定正确，所以我们选择否，然后修改这个配置文件

![请添加图片描述](https://i-blog.csdnimg.cn/direct/cb250286852d4def9904c5d469eefee0.png)

在本地查询jre的本地路径，注意从jdk9开始，jre就被融入到jdk中，没有在jdk下单独一个文件夹，所以这里需要注意。

![请添加图片描述](https://i-blog.csdnimg.cn/direct/9344943e555d4ae3b18e8c0188ac21f2.png)

这里需要增加 `#define MyJreName "jre"`

这里需要增加`Source: "自己本地JRE路径\*"; DestDir: "{app}\{#MyJreName}"; Flags: ignoreversion recursesubdirs createallsubdirs` 

点击绿色按钮直接编译

![请添加图片描述](https://i-blog.csdnimg.cn/direct/72a4fd48e0ee4aea8f17e7a7975b91ba.png)

当绿色滚动条结束后，桌面会多了一个setup.exe文件

![img](https://img-blog.csdnimg.cn/img_convert/1f671fe1300c3442202f4ad206a67201.png)

也同时会跳出一个安装的，因为程序帮你自动启动生成的安装程序了，安装就可以了，安装的时候记得勾选创建快捷方式

![img](https://img-blog.csdnimg.cn/img_convert/c877a19dde7de38aae25b39db4f029c0.png)

这个就是最后的程序了，双击运行就可以看到结果了，把setup.exe文件给别人安装，就都可以看到自己的程序了！

## 总结

这样我们的java到jar包到exe到集成exe就完成啦。

**总结步骤：**
1. 使用exe4j将jar包转换为exe文件
2. 使用inno setup集成JRE依赖
3. 生成完整的安装包，无需目标机器安装JRE

**注意事项：**
- exe4j生成的exe需要JRE环境支持
- inno setup只支持Windows系统
- JDK9以后JRE集成在JDK中，路径需要注意
- Mac用户建议使用Windows虚拟机或借用Windows电脑 