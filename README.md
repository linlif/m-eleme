# m-eleme(仿饿了么移动端单页应用)

## 项目运行
```bash
# 克隆项目到本地文件夹
git clone git@github.com:linlif/m-eleme.git

# 安装Node依赖
npm install

# 开启本地服务器(开启后浏览器访问：http://localhost:8080)
npm run dev

```

## 项目说明

>项目用到的技术栈

vue2 + vue-router2 + vue-cli2 + vue-resource + stylus + flex + es6 + eslint + webpack2

>主要技术使用说明

- 基于Vue2语法编写
- 使用vue-cli2脚手架搭建项目
- 使用webpack2打包项目文件
- 使用vue-router实现路由切换
- 使用vue-resource实现数据异步请求
- 使用stylus编写样式
- 使用flex实现弹性布局
- 使用better-scroll实现水平和垂直滚动
- 使用eslint进行代码规范检查
- 使用localStorage实现本地存储
- 使用Sticky footers布局，让内容未超过屏幕时，关闭按钮也能定位在屏幕底部

>参考资料

- vue2.0官网： https://vuefe.cn/v2/guide/
- webpack1免费视频课程，戳这里：http://www.imooc.com/learn/802
- webpack1向webpack2升级：https://webpack.js.org/guides/migrating/
- better-scroll插件使用：https://github.com/ustbhuangyi/better-scroll
- stylus： http://www.zhangxinxu.com/jq/stylus/
- ES6: http://es6.ruanyifeng.com/
- Sticky footers http://www.w3cplus.com/css3/css-secrets/sticky-footers.html
- Flex弹性布局: http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool
- localStorage本地存储: http://www.cnblogs.com/st-leslie/p/5617130.html
- 最后：本项目有付费视频课程，戳这里：http://coding.imooc.com/class/74.html


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


