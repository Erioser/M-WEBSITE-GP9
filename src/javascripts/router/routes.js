
const appIndexController = require('../controllers/app-index-controller')
const appCinemaController = require('../controllers/app-cinema-controller')

// 路由表
let routes = {
    '/index': appIndexController.render,
    '/cinema': appCinemaController.render,
    '/404': () => {  }
}

module.exports = routes