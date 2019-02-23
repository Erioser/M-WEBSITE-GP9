
const appIndexController = require('../controllers/app-index-controller')
const appCinemaController = require('../controllers/app-cinema-controller')

// 路由表
let routes = {
    '/index': appIndexController.render,
    '/cinema': appCinemaController.render,
    '/404': () => {  },
    '/mine': () => {
        // 如果有登录信息，执行个人中心控制器的render
        // 如果没有登录信息， 执行登录控制器render
    }
}

module.exports = routes