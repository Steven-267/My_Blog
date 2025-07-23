---
icon: pen-to-square
date: 2025-7-8
category:
- 后端
tag:
- Java
- 面试
- 场景
---

# 如果让你设计一个 RPC 框架，你该怎么做？

---

## 前言：什么是 RPC？为啥要它？

先打个比方：

 你去餐厅点菜，你只负责“点”，不关心厨师怎么做、厨房在哪。你说：“我要一份麻辣烫”，然后等着吃。

**RPC（Remote Procedure Call，远程过程调用）** 就像这样：

* 你是客户端
* 餐厅是服务器
* 厨房逻辑封装好了
* 你用“本地方式”发出“远程请求”，结果返回到你手里

**一句话理解：**

> RPC 让你像调用本地函数一样，去调用另一台服务器上的服务。

---

## 面试官要你设计一个 RPC 框架，他想看什么？

面试官并不指望你造一个「阿里 Dubbo」，而是考你：

* 懂不懂调用链流程？
* 知不知道服务注册、调用、返回里有什么坑？
* 能不能把复杂的系统拆成模块说清楚？

---

## 一个简单 RPC 框架，需要有哪些模块？

我们来对标快递流程：

| 模块       | 对应快递场景     | 功能说明           |
| -------- | ---------- | -------------- |
| 服务注册中心   | 菜鸟驿站       | 记录服务在哪里（ip+端口） |
| 客户端代理    | 快递代寄点      | 你不走到厨房也能点菜     |
| 网络传输层    | 快递小哥       | 把调用打包送到服务端     |
| 编解码（序列化） | 快递打包箱 + 拆箱 | 对象转字节流，传输后还原   |
| 负载均衡模块   | 多个厨师，选谁做菜？ | 服务实例很多时怎么选     |
| 服务端处理器   | 厨房         | 真正执行函数逻辑       |

---

## ️ 分步骤详细实现讲解

### 第 1 步：接口定义（说好你想干嘛）

双方必须约定接口，不然你喊“来份麻辣烫”，后厨不知道配料表。

```java
public interface UserService {
    User getUserById(Long id);
}
```

---

### 第 2 步：服务注册中心

* 假设我们用 Nacos/Zookeeper 来注册服务
* 服务启动时上报自身地址：`192.168.1.10:8001`
* 客户端拉取服务列表做调用

注册中心就是**服务的通讯录**。

---

### 第 3 步：代理层（让本地调用看起来像远程调用）

JDK 动态代理机制：

```java
UserService userService = RpcClient.getProxy(UserService.class);
userService.getUserById(1L); // 看起来像本地，其实底层发起远程请求
```

你点“getUserById”，其实内部：

* 构造一个 RPC 请求对象
* 序列化成字节流
* 网络发送给服务端
* 等服务端返回结果

---

### 第 4 步：序列化传输

Java 对象在 JVM 里不能直接过网线，要序列化。

我们推荐：

* Protobuf（二进制高性能）
* JSON（人类友好但慢）
* Kryo（比 Java 序列化快）

```java
byte[] data = serializer.serialize(request);
Request req = serializer.deserialize(data, Request.class);
```

---

### 第 5 步：通信层（发送数据）

你需要：

* 客户端建立连接（Netty 或 Socket）
* 服务端监听端口接收请求

客户端代码（伪代码）：

```java
Socket socket = new Socket(serverIp, port);
socket.getOutputStream().write(data);
```

服务端代码监听接收、解码、执行方法并返回。

---

### 第 6 步：协议设计（发什么内容？）

一个 RPC 协议包，建议这样设计：

```
+------------+----------+-------------+--------+
| 魔数 4字节 | 类型 1字节 | 请求ID 8字节 | 数据体 |
+------------+----------+-------------+--------+
```

这样方便调试、扩展和解析。

---

### 第 7 步：负载均衡策略

假设注册中心有多个实例：

* `192.168.1.10:8001`
* `192.168.1.11:8001`
* `192.168.1.12:8001`

怎么选？

* 随机：Random
* 轮询：RoundRobin
* 一致性哈希：ConsistentHash

写个简单轮询类：

```java
public class RoundRobinLoadBalancer {
    private AtomicInteger index = new AtomicInteger(0);

    public String select(List<String> servers) {
        return servers.get(index.getAndIncrement() % servers.size());
    }
}
```

---

## 一次调用全过程回顾

1. 用户调用代理对象 `userService.getUserById(1)`
2. 代理将请求封装成 Request 对象
3. 使用 Protobuf 序列化请求
4. Netty 客户端将数据发送
5. 服务端接收到数据后解码
6. 找到目标方法并执行
7. 将结果序列化并返回给客户端
8. 客户端反序列化成 User 对象返回

---

