
const { getFilmsList } = require('../models/app-index-model')
const appHeaderView = require('../views/app-header.html')
const appMainView = require('../views/app-main.html') 

const render = async () => {
    $('.loading').removeClass('hide')// 显示加载
    
    // 渲染头部
    $('#app #header').html(
        Handlebars.compile(appHeaderView)({ title: '猫眼电影' })
    )

    // 渲染首页的电影列表
    let filmsList = await getFilmsList()
    let template = Handlebars.compile(appMainView)
    $('#app #main').html(template({ films: filmsList.movieList }))

    $('.loading').addClass('hide')// 显示加载
}

module.exports = { render }