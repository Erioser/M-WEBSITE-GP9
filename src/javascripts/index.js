const Router = require('./router')
const appController = require('./controllers/app-controller')

appController.render()

// 初始化路由
new Router({
    initial: '/index'
}).init()












// let promise = new Promise((resolve, rejected) => {
//     setTimeout(() => {
//         resolve(123)
//     }, 2000)
// })
// const a = async () => {
//     let haha = await promise.then((data) => {
//         return data
//     })
//     //use haha
// }
// a()