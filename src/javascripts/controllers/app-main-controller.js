
const { getFilmsList } = require('../models/app-main-model')
 
const render = async () => {
    let appMainView = require('../views/app-main.html') 

    // 渲染首页的电影列表
    let filmsList = await getFilmsList()
    let template = Handlebars.compile(appMainView)
    $('#app #main').html(template({ films: filmsList.movieList }))


}

module.exports = { render }