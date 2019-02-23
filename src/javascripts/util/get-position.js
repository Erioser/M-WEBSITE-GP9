
const getPosition = () => {
    return new Promise(function (resolve, injected) {
        var map = new AMap.Map('container', {
            resizeEnable: true
        });
        AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：5s
    
            });
            geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    onComplete(result)         
                }else{
                    onError(result)
                }
            });
        });
        //解析定位结果
        function onComplete(data) {
            let { lat, lng } =  data.position
            regeoCode([lng, lat])
        }
        //解析定位错误信息
        function onError(data) {
            console.log(data)
        }
    
    
        var geocoder,marker;
        function regeoCode(lnglat) {
            if(!geocoder){
                geocoder = new AMap.Geocoder({
                    city: "010", //城市设为北京，默认：“全国”
                    radius: 1000 //范围，默认：500
                });
            }
            geocoder.getAddress(lnglat, function(status, result) {
                if (status === 'complete'&&result.regeocode) {
                    resolve(result)
                }else{alert(JSON.stringify(result))}
            });
        }
    })
}

module.exports = getPosition