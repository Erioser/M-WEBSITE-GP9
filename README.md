# M-WEBSITE-GP9
移动M站的开发环境与功能实现


### Store的实现

因为构建的是单页面应用而且还实现了MVC结构，所以整个项目中分离的模块非常的多，而这些模块都会有自己的私有作用域，彼此之间的通信也非常的复杂，为了实现模块间的通信和数据共享，实现了意见简易的状态管理工具Store，核心思想采用了观察者模式，需要使用数据并再数据变化后更新的模块就可以观察Store中的数据变化（subscribe），需要更改数据的模块直接利用setState来更新数据

> 观察者模式描述的是一对多的关系，而发布订阅模式描述的是多对多关系


### 生产环境

1. 利用gulp --gulpfile命令分离开发配置文件和生产配置文件
2. 去掉生产环境配置中不需要东西：server/watch...
3. 压缩代码

    webpack mode -> production
    sass  outputStyle -> compressed 
    gul-htmlmin -> HTML压缩

4. 处理兼容

    gulp-autoprefixer 为css代码添加兼容前缀
    
    利用babel处理js
    "@babel/core": "^7.3.3",
    "@babel/plugin-transform-runtime": "^7.2.0",
    "@babel/preset-env": "^7.3.1",
    "@babel/runtime": "^7.3.1",
    "babel-loader": "^8.0.5",

5. 版本号

    gulp-rev 生产版本号与版本配置文件
    gulp-rev-collector 为HTML文件替换资源路径

    gulp-sequence 处理任务执行的顺序，先打包css，js，然后再打包html
