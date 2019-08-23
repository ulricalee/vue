# vue
* multiple entry
* 登录注册 liyingchao123 123456789

##
* host 127.0.0.1 lyc.com

## server
* 进入MongoDB的安装目录 /Users/yingchaoli/Documents/mongodb-osx-x86_64-4.0.4
* 执行 mongod --dbpath data --logpath log/mongod.log --logappend --fork
* 关闭 在操作数据库的终端输入use admin后再输入db.shutdownServer() 
* Redis 进入redis目录/usr/local/etc 输入 redis-server

## 本地开发
* 1. npm run dev
* 2. nodemon ./server/server.js