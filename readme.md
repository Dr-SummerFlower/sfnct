### Node Create Tools

这个包的用途是快速创建代码模版。


#### 安装

请使用`npm`或`yarn`全局安装此包
```bash
npm install -g sfnct
```

#### 创建命令
1. 使用命令`nct -t <name>`创建应用模版
    - `nct -t express-app` -> 生成一个express的基础模版
    - `nct -t koa-app` -> 生成一个Koa的基础模版
2. 使用命令`nct -f <name>`创建文件模版
    - `nct -f user.js` -> 生成一个user.js的文件