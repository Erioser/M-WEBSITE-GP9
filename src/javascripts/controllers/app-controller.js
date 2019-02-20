// 整个应用程序的控制器，其中有一个任务就是将app应用的主体视图渲染到页面

const appMainController = require('./app-main-controller')

const render = () => {
    // 1. 获取视图
    let appHeaderView = require('../views/app-header.html')
    let appFooterView = require('../views/app-footer.html')
    

    // 2. 渲染视图
    $('#app #header').html(
        Handlebars.compile(appHeaderView)({ title: '猫眼电影' })
    )
    
    $('#app #footer').html(appFooterView)
    // 渲染主体区域
    appMainController.render()
        
}

module.exports = { render }