
const appHeaderView = require('../views/app-header.html')
const appIndexNowController = require('./app-index-now-controller')
const appIndexComingController = require('./app-index-coming-controller')
const appMainView = require('../views/app-main.html') 

const Store = require('../store')

const { 
    getPositionModel
} = require('../models/app-index-model')

let targetType = 'coming' // 当前的显示类型
const render = async () => {

    $('.loading').removeClass('hide')// 显示加载
    
    // 渲染头部
    $('#app #header').html(
        Handlebars.compile(appHeaderView)({ title: '猫眼电影' })
    )

    // 渲染内容
    $('#app #main').html(appMainView)
    
    
    // 绑定切换按钮
    controlTypes()
    
    // 渲染对应的内容
    contentRenderHandler()

    $('.loading').addClass('hide')// 显示加载

    // 订阅城市变化，不管任何时刻只要城市变化
    new Store().subscribe((state) => {
        $('.film-controls__city').html(state.city)
    })

    

    // 定位城市
    let positionInfo = await getPositionModel()
    console.log(positionInfo)
    new Store().setState({ city: positionInfo.regeocode.addressComponent.province })
    

    
   
   
}
// 切换类型的按钮处理
function controlTypes () {
    $('.film-controls__type-item').click(function () {
        if ( $(this).data('type') === targetType ) {
            return false
        }
        targetType = $(this).data('type')  
        $(this).addClass('active').siblings().removeClass('active')    
        contentRenderHandler()
    })
}
// 渲染对应视图方法
function contentRenderHandler () {
    if ( targetType === 'now' ) {
        appIndexNowController.render();
        return false;
    }
    appIndexComingController.render()
}



module.exports = { render }