


class Store {
    constructor () {
        if ( Store.instance ) return Store.instance
        return this.createInstance()
    }

    createInstance () {


        const instance = {
            state: {
                city: '佳木斯'
            },
            listeners: [],// 倾听方法
            getState (key) { // 获取数据 为了保护数据
                if ( key ) return (this.state[key] || null)
                return this.state
            },
            setState (options) { // 设置数据 
                for (let key in options) {
                    this.state[key] = options[key]
                }
                // 通知其他人
                this.publish()
            },
            subscribe (handler) { // 订阅
                this.listeners.push(handler)
            },
            publish () { // 发布
                this.listeners.forEach((handler) => {
                    handler(this.getState())
                })
            }
        }
        

        Store.instance = instance
        return instance
    }
}

module.exports = Store