
const appController = require('./controllers/app-controller')

appController.render()


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