---
title: MacOS实现 java程序转换成exe(程序附带rsa非对称加密鉴权修改密码github仓库)
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

### 步骤1：启动exe4j并输入注册码

![exe4j启动界面](/My_Blog/assets/images/tutorials/java-exe/step1.png)

### 步骤2：选择项目类型

![选择JAR in EXE模式](/My_Blog/assets/images/tutorials/java-exe/step2.png)

### 步骤3：配置应用程序信息

![配置应用基本信息](/My_Blog/assets/images/tutorials/java-exe/step3.png)

### 步骤4：设置可执行文件信息

![设置exe文件名和图标](/My_Blog/assets/images/tutorials/java-exe/step4.png)

这里需要选择64位架构：

![选择64位架构](/My_Blog/assets/images/tutorials/java-exe/step5.png)

### 步骤5：配置Java调用参数

![配置JAR文件路径](/My_Blog/assets/images/tutorials/java-exe/step6.png)

### 步骤6：设置JRE要求

![设置最低JRE版本要求](/My_Blog/assets/images/tutorials/java-exe/step7.png)

### 步骤7：配置启动画面

![配置启动画面（可选）](/My_Blog/assets/images/tutorials/java-exe/step8.png)

### 步骤8：生成可执行文件

![开始编译生成exe文件](/My_Blog/assets/images/tutorials/java-exe/step9.png)

### 步骤9：完成exe生成

![exe生成完成](/My_Blog/assets/images/tutorials/java-exe/step10.png)

## 使用Inno Setup集成JRE

前面我们生成的exe文件需要目标机器安装JRE才能运行。为了让程序在没有JRE的机器上也能运行，我们需要使用Inno Setup将JRE打包进安装程序。

### 步骤10：准备JRE文件

![准备JRE运行时环境](/My_Blog/assets/images/tutorials/java-exe/step11.png)

### 步骤11：配置Inno Setup项目

首先启动Inno Setup，创建新的安装项目：

![Inno Setup项目配置界面](/My_Blog/assets/images/tutorials/java-exe/step12.png)

### 步骤12：设置应用程序信息

![设置应用程序基本信息](/My_Blog/assets/images/tutorials/java-exe/step13.png)

### 步骤13：添加文件和目录

![添加exe文件和JRE目录](/My_Blog/assets/images/tutorials/java-exe/step14.png)

**重要提示：** 需要将之前生成的exe文件和完整的JRE目录都添加到安装包中。

### 步骤14：配置安装选项

![配置安装向导选项](/My_Blog/assets/images/tutorials/java-exe/step15.png)

### 步骤15：编译安装程序

![编译生成最终安装程序](/My_Blog/assets/images/tutorials/java-exe/step16.png)

### 步骤16：完成打包

![安装程序生成完成](/My_Blog/assets/images/tutorials/java-exe/step17.png)

## 最终结果

经过以上步骤，我们就成功将Java程序打包成了可以在任何Windows机器上独立运行的安装程序，无需用户预先安装JRE。

### 文件结构示例

![最终文件结构](/My_Blog/assets/images/tutorials/java-exe/step18.png)

### 安装程序运行效果

![安装程序运行界面](/My_Blog/assets/images/tutorials/java-exe/step19.png)

## 总结

### 完整流程回顾

1. **准备阶段**：确保Java程序可以正常运行，准备jar文件
2. **exe4j转换**：使用exe4j将jar文件转换为exe可执行文件
3. **JRE准备**：下载并准备目标JRE版本
4. **Inno Setup打包**：使用Inno Setup将exe和JRE打包成安装程序
5. **测试验证**：在目标环境中测试安装程序和应用运行

### 关键注意事项

- **架构匹配**：确保JRE架构（32位/64位）与目标系统匹配
- **版本兼容**：JRE版本要满足Java程序的最低要求
- **文件完整性**：JRE目录必须完整，缺少文件会导致运行失败
- **路径配置**：在Inno Setup中正确配置exe文件和JRE的相对路径

### 优势分析

- **独立部署**：无需用户安装JRE，降低部署难度
- **用户友好**：标准的Windows安装程序，用户体验好  
- **版本控制**：可以绑定特定JRE版本，避免兼容性问题
- **专业外观**：可以自定义图标、启动画面等，提升软件专业度

通过这种方式，我们成功解决了Java程序分发和部署的问题，让Java应用能够像原生Windows程序一样方便地安装和使用。 