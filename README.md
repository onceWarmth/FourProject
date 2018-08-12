# FourProject Server

## 说明
安装 npm 包执行命令如下：
```
npm install
```
运行前需在指定 mysql 中创建名为“FourProjectDb”的数据库,并在 ./libs/models 中设定正确的用户名和密码<br>

初始化数据库命令：
```
node db-init.js
```
运行服务命令如下：
```
node app.js
```

登录界面链接
* [http://localhost:3000/login.html](http://localhost:3000/login.html)

运行前需在指定 mysql 中创建名为“FourProjectDb”的数据库,并在 ./libs/models 中设定正确的用户名和密码

## 要求
NodeJs >= 8.11.3

## ORM 说明
见 ./libs/models.js

## 静态目录
见 ./static/

## 密码加密说明
见 ./libs/encryption.js<br>
具体步骤如下<br>
1. 生成 6 位随机数作为盐值（salt）
2. 将盐值添加在密码之后
3. 将组合后的字符串进行 sha256 哈希
4. 将哈希后的值的 16 进制和盐值一起存储在数据库中
5. 密码验证时，用数据库中存储的盐值进行 2-4 步对用户的输入密码进行加密并和数据库的数据进行比对

## 结构说明
1. libs: 工具类目录
2. routers: 路由（路径、url）配置目录
3. service: 服务目录，包括具体的逻辑实现
