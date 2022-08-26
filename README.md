# 在线弹钢琴！

## 1.介绍
这是一个可以让用户在线弹钢琴的网页应用，它允许弹奏包括C3到B5的钢琴音。并且还有保存录音功能，能同时播放保存的多个录音，登录之后还能上传到云端，用户登录即可同步本地录音到云端。仅供学习交流使用。

## 2.部署
### 2.1依赖
需要安装node.js和mysql，node.js需要配置mysql库。
### 2.2部署
1.用node命令运行src下Service.js文件。
2.用mysql运行文件夹下pianoSystem.sql完成数据库初始化。
3.在根目录搭建本地服务器。

## 3.使用
主页面用鼠标点击钢琴上对应按钮即可演奏。按钢琴下方录音键即进入录音模式，此时弹奏钢琴会被记录下来，再次按录音键即可停止录音，并生成录音。在左侧可以看到存储在本地浏览器的所有录音。勾选要播放的录音，按录音上方播放按钮即可播放勾选的所有录音。
在右上方有登录和注册按钮，可以根据用户名和密码登录或注册。注意进入登录状态即可将所有录音更改同步到云端，并且会将云端的录音覆盖本地录音，请注意（注册成功后会把本地录音同步到云端，而不会覆盖本地录音）。

## 4.后续优化计划
1.后续会优化初次弹钢琴音可能会延迟的问题。
2.美化界面。
3.播放按钮功能优化，让停止按钮起作用。目前若要停止正在播放的录音，刷新页面即可。
# first_piano

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
