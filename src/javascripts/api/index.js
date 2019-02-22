// 封装api是为了统一处理跨域路径 还有 对请求回来的数据的处理
const api = {
    request ({
        url, data, methods,
        source
    }, mock) {
        return $.ajax({
            // url: 'http://m.maoyan.com/ajax/movieOnInfoList?token=',
            url: (mock ? '' : (source || '/maoyan') ) + url,
            data: data || {},
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

module.exports = api