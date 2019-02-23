// views
const appMainComingView = require('../views/app-main-coming.html')
const ComingBannerView = require('../views/index/coming-banner.html')
const ComingRecommendView = require('../views/index/coming-recommend.html')
const ComingListView = require('../views/index/coming-list.html')

// models
const {
    getComingBanner,
    getComingRecommend,
    getComingList
} = require('../models/app-index-model')

// swiper and better-scroll
var BScroll = require('better-scroll').default
const Swiper = require('swiper').default


let targetDate, movieIds, page, pageSize, comingListSource, hasMore, loading 
const init = () => {// 初始化数据
    targetDate = null // 日期对比依据
    movieIds = [] // 所有的电影的id
    page = -1 // 页数
    pageSize = 10// 每页10条
    comingListSource = [] // 所有的电影
    hasMore = true // 有无更多
    loading = false // 是否正在加载
}

const render = async () => {
    init()// 每次切换回即将上映
    // 渲染大架子
    $('.app-index-view').html(appMainComingView)

    renderBanner() // 轮播图
    renderRecommend() // 推荐 
    renderComingList() // 电影列表
    // 实例化better-scroll
    let better = new BScroll('.coming-content', {
        pullUpLoad: {
            threshold: 50
        },
        click: true,
        probeType: 3
    })
    // 给better-scroll绑定了上拉事件
    better.on('pullingUp', function () {
        // 开始进行数据获取
        renderComingList(better) 
        // 结束此次上拉（如果不结束，下次就不能触发）     
        better.finishPullUp()
    })

    let $backTop = $('.back-top')

    better.on('scroll', function () {
        // 如果到了距离，并且元素没有fadeIn的时候
        if ( better.y < -500 && !$backTop.hasClass('fadeIn') ) {
            $backTop.removeClass('fadeOut').addClass('fadeIn')
        } else if ( better.y >= -500 && $backTop.hasClass('fadeIn') ) {
            $backTop.removeClass('fadeIn').addClass('fadeOut')
        }
    })

    // 回到顶部
    $backTop.click(() => {
        better.scrollTo(0, 0, 300)
    })

}
 // 渲染列表
async function renderComingList (better) {
    if ( !hasMore ) { // 如果没有了更多
        console.log('没有更多了')
        return false
    }
    if ( loading ) { // 如果正在加载
        return false
    }
    // 开始加载
    loading = true;
    $('.loading').removeClass('hide') // 显示加载图标
    
    page ++ // 页数增加
    // 请求数据的参数（对应的id）
    let pageMovieIds = page ? movieIds.slice(page * pageSize, (page + 1) * pageSize).join(',') : undefined
    
    // 判断有无更多数据
    if ( typeof pageMovieIds === 'string' && !pageMovieIds.length ) {
        hasMore = false
    }

    

    let data = await getComingList(pageMovieIds)
    // 第一次获取到全部id时存储
    if (data.movieIds) movieIds = data.movieIds 
    // 将每次获取的数据都放入到整体的数据中
    comingListSource = [ ...comingListSource, ...data.coming ] 
    $('#coming-list').html(
        Handlebars.compile( ComingListView)({
            list: handleListFormat(comingListSource)
        })
    )
    // 加载完成后
    loading = false
    // 通知better-scroll重新计算高度
    if (better) better.refresh()
    $('.loading').addClass('hide') // 隐藏加载图标
}

async function renderRecommend () {
    // 推荐
    let data = await getComingRecommend()
    $('.app-index-view #coming-recommend').html(
        Handlebars.compile(ComingRecommendView)({
            list: replaceImageWH(data.coming, '170.230')
        })
    )
    new Swiper('.coming-recommend__content', {
        slidesPerView: 'auto',
        spaceBetween: 14,
        freeMode: true
    });
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

// 处理图片
function replaceImageWH (data, size) {
    data.forEach(item => {
        item.img = item.img.replace(/w.h/g,size)
    })
    return data
}

// 处理数据格式
function handleListFormat (items) {
    items.forEach(item => {
        if ( item.sc ) {
            item.situation = `观众评 <span>${item.sc.toFixed(1)}</span>`
        } else {
            if ( item.preShow ) {
                item.situation = `<span>${item.wish}</span>人想看`
            } else {
                item.situation = `暂无评分`
            }
        }
        item.pre = item.showst === 4
        if ( item.comingTitle !== targetDate ) {
            item.showDate = true
            targetDate = item.comingTitle
        }
        
        item.img = item.img.replace(/\/w.h\//g, '/128.180/')  
    })
    return items
}


module.exports = {
    render
}