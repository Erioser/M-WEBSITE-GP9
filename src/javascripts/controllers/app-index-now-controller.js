const { getFilmsList, getTestMock } = require('../models/app-index-model')

const appMainNowView = require('../views/app-main-now.html')

const render = async () => {
     // 渲染首页的电影列表
     let filmsList = await getFilmsList()
     let template = Handlebars.compile(appMainNowView)
     $('.app-index-view').html(
         template({ films: handleListFormat(filmsList.movieList) })
     )
}


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
        item.img = item.img.replace(/\/w.h\//g, '/128.180/')  
    })
    return items
}

module.exports = {
    render
}