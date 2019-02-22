
const appMainComingView = require('../views/app-main-coming.html')
const ComingBannerView = require('../views/index/coming-banner.html')
const ComingRecommendView = require('../views/index/coming-recommend.html')
const {
    getComingBanner
} = require('../models/app-index-model')
const Swiper = require('swiper').default

const render = async () => {
    $('.app-index-view').html(appMainComingView)

    renderBanner() // 轮播图
    renderRecommend() // 推荐
    
    

}

function renderRecommend () {
    // 推荐
    $('.app-index-view #coming-recommend').html(
        ComingRecommendView
    )
}


async function renderBanner () {
    // 获取轮播图数据
    let comingBanner = await getComingBanner()
    $('.app-index-view #coming-banner').html(
        Handlebars.compile(ComingBannerView)({
            list: comingBanner.data
        })
    )  
    // 实例化swiper
    var mySwiper = new Swiper ('.coming-swiper', {
        loop: true, // 循环模式选项       
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        }
    })  
}

module.exports = {
    render
}