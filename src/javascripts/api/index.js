// 封装api是为了统一处理跨域路径 还有 对请求回来的数据的处理
const Store = require('../store')
const api = {
    config: {
        city: new Store().getState().city
    },
    request ({
        url, data, methods,
        source
    }, mock) {
        let _data = data || {}
        _data.city = _data.city || this.config.city
        return $.ajax({
            // url: 'http://m.maoyan.com/ajax/movieOnInfoList?token=',
            url: (mock ? '' : (source || '/maoyan') ) + url,
            data: _data,
            methods: methods || 'get',
            success: (res) => {
                return res
            },
            error: (error) => {
                console.log('请求出错了', error)
            }
        }) 
    },
    mock (options) {
        return this.request(options, true)
    }
}

new Store().subscribe((state) => {
    api.config.city = state.city
})

module.exports = api