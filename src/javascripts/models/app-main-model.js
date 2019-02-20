const api = require('../api')
// 获取电影
const getFilmsList = () => {
    return api.request({ url: '/ajax/movieOnInfoList?token=' })
}

module.exports = {
    getFilmsList
}






// return new Promise((resolve, reject) => {
    //     api.request({
    //         url: '/ajax/movieOnInfoList?token=',
    //         success: (data) => {
    //             resolve(data)
    //         }
    //     })
    // })