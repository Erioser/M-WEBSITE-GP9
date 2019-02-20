// 整个应用程序的控制器，其中有一个任务就是将app应用的主体视图渲染到页面

const render = () => {
    // 1. 获取视图
    let appFooterView = require('../views/app-footer.html')
    

    
    
    $('#app #footer').html(appFooterView)     
}

module.exports = { render }