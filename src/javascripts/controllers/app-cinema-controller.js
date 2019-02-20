const appHeaderView = require('../views/app-header.html')
const render = () => {
    // 渲染头部
    $('#app #header').html(
        Handlebars.compile(appHeaderView)({ title: '影院' })
    )

    $('#app #main').html('cinema')

}

module.exports = { render }