export default  function MapLoader() {
    let aMapScript = document.createElement('script')
    aMapScript.setAttribute('src', 'https://webapi.amap.com/maps?v=1.4.11&key=05fc4f88a4b75ff7ba5673ac8664ecd2&plugin=AMap.CitySearch')
    document.head.appendChild(aMapScript)
    // var AMap:any = null;
    return aMapScript.onload = function() {
        window.AMap.plugin('AMap.Geolocation', function() {
            var geolocation = new window.AMap.Geolocation({
                // 是否使用高精度定位，默认：true
                enableHighAccuracy: true,
                // 设置定位超时时间，默认：无穷大
                timeout: 10000,
                // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                buttonOffset: new window.AMap.Pixel(10, 20),
                //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                zoomToAccuracy: true,
                //  定位按钮的排放位置,  RB表示右下
                buttonPosition: 'RB'
            })
 
            geolocation.getCurrentPosition()
            window.AMap.event.addListener(geolocation, 'complete', onComplete)
            window.AMap.event.addListener(geolocation, 'error', onError)
 
            function onComplete(data:any) {
                // data是具体的定位信息
                console.log(data)
                console.log('123123')
            }
 
            function onError(data:any) {
                console.log(data)
                    // 定位出错
                console.log('123123s')
            }
        })
    }
}