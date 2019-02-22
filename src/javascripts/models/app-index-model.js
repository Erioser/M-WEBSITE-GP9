const api = require('../api')
// 获取电影
const getFilmsList = () => {
    return api.request({ url: '/ajax/movieOnInfoList?token=' })
}
const getComingBanner = () => {
    return api.mock({ url: 'http://localhost:8000/banner' })
}
const getTestMock = () => {
    return api.mock({ url: 'http://localhost:8000/a/aa' })
}
module.exports = {
    getFilmsList,
    getTestMock,
    getComingBanner 
}






// return new Promise((resolve, reject) => {
    //     api.request({
    //         url: '/ajax/movieOnInfoList?token=',
    //         success: (data) => {
    //             resolve(data)
    //         }
    //     })
    // })