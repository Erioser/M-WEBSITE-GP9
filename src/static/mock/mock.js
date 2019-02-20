
module.exports = () => { 
    return {
        a: require('./a.json'),//   /a
        b: require('./b.json')//   /b
    }
}


// /a/aa -> /a