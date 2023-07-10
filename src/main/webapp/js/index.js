let map;

window.onload = function() {
    
    
    
}

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 36.014, lng: 129.39734 }
        // minZoom: 6,
        // maxZoom: 18,
        // mapTypeControl: false,  // 맵 타입 컨트롤
        // streetViewControl: false,  // 거리 뷰 컨트롤
        // fullscreenControl: false,  // 전체 보기 컨트롤
        // zoomControl: false  // 확대/축소 컨트롤
    });
}