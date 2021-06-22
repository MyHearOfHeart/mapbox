



// 使用的token，注册好后可以去看
mapboxgl.accessToken = 'pk.eyJ1IjoibXloZWFydG9mbHYiLCJhIjoiY2tuZW4xNjd0MWc5eTJ1cGt0YWk5bnE0MSJ9.gZEsmg0e8lcmJ6x1Xisn5A';
//style用于指定使用的Mapbox地图
style = 'mapbox://styles/mapbox/streets-v11';
//center用于指定地图初始显示中心
center = [114.2908239022783, 30.570807560925644];
// 放大等级，1最大
zoom = 8;

var map = document.getElementById('map');


/*
* mapboxgl.Map用于构建一个map对象
* 参数container指定使用的地图容器id
* style用于指定使用的Mapbox地图
* center用于指定地图初始显示的中心
* 现在我们可以通过鼠标拖拽、缩放地图，并使用鼠标右键旋转（bearing属性）、倾斜（pitch属性）地图。
*/
var map = new mapboxgl.Map({
    container: 'map',
    style: style,
    center: [114.2908239022783, 30.570807560925644], // 设置地图中心
    zoom: zoom,  // 设置地图比例
    Pointsize :7,
    hash: true
})


// 添加导航条
var nav = new mapboxgl.NavigationControl();
map.addControl(nav,'bottom-right')

// 添加比例尺
var scale = new mapboxgl.ScaleControl({
    // 比例尺的最大像素长度，default ：100
    maxWidth:100,
    // 距离单位 ：metric（米制的）
    unit:"metric"
});
map.addControl(scale)


//添加地图位置搜索框
var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
});
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

//切换图层
var layerList = document.getElementById('style-menu');
var inputs = layerList.getElementsByTagName('input');

function switchLayer(layer) {
    var layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
}

for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
}

//切换图层颜色
var swatches = document.getElementById('swatches');
var colors = [
    '#ffffcc',
    '#a1dab4',
    '#41b6c4',
    '#2c7fb8',
    '#253494',
    '#fed976',
    '#feb24c',
    '#fd8d3c',
    '#f03b20',
    '#bd0026'
];
colors.forEach(function (color) {
    var swatch = document.createElement('button');
    swatch.style.backgroundColor = color;
    swatch.addEventListener('click', function () {
        map.setPaintProperty('water', 'fill-color', color);
    });
    swatches.appendChild(swatch);
});





// 建立一个标记点
var marker = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([114.2908239022783, 30.570807560925644])
    .addTo(map);
function onDragEnd() {
    var lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML = '当前点经度' + lngLat.lng + '<br/>当前点纬度' + lngLat.lat;
}
marker.on('dragend', onDragEnd);
document.getElementById('coordinates').innerHTML = '当前点经度:' +marker.getLngLat().lng+'<br/>当前点纬度:'+marker.getLngLat().lat;

// 点击获取经纬度模块&点击标记点
map.on('click', function (e) {
    document.getElementById('coordinates').innerHTML = '当前点经度:' +e.lngLat.lng+'<br/>当前点纬度:'+e.lngLat.lat;
    marker.setLngLat([e.lngLat.lng,e.lngLat.lat]).addTo(map)
    info_lng_lat.innerHTML = map.getCenter().lng;
    info_lng_lat2.innerHTML = map.getCenter().lat;
    info_lng_lat3.innerHTML = map.getPitch();
    info_lng_lat4.innerHTML = map.getBearing();
    info_lng_lat5.innerHTML = map.getZoom();
})
var info_lng_lat = document.getElementById("rd1");
var info_lng_lat2 = document.getElementById("rd2");
var info_lng_lat3 = document.getElementById("rd3");
var info_lng_lat4 = document.getElementById("rd4");
var info_lng_lat5 = document.getElementById("rd5");

info_lng_lat.innerHTML = map.getCenter().lng;
info_lng_lat2.innerHTML = map.getCenter().lat;
info_lng_lat3.innerHTML = map.getPitch();
info_lng_lat4.innerHTML = map.getBearing();
info_lng_lat5.innerHTML = map.getZoom();

// 添加其他数据
map.on('moveend',function(e){
    info_lng_lat.innerHTML = map.getCenter().lng;
    info_lng_lat2.innerHTML = map.getCenter().lat;
    info_lng_lat3.innerHTML = map.getPitch();
    info_lng_lat4.innerHTML = map.getBearing();
    info_lng_lat5.innerHTML = map.getZoom();
})

// 标志点飞到目标经纬度
$("#fly").click(function(){
    var X = $("#x").val();
    var Y = $("#y").val();
    marker.setLngLat([X,Y]).addTo(map)
    document.getElementById('coordinates').innerHTML = '当前点经度:' + X+'<br/>当前点纬度:'+ Y;
})

// 调整地图中心点
$("#tiao").click(function(){
    var X = $("#xl").val();
    var Y = $("#yl").val();
    map.setCenter([X,Y])
})


















