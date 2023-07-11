


const ships = [
    { id: 1, name: '테스트 선박1', current: { lat: 36.5, lon: 130.39 } },
    { id: 2, name: '테스트 선박2', current: { lat: 36.0, lon: 130.39 } },
    { id: 3, name: '테스트 선박3', current: { lat: 35.5, lon: 130.39 } }
];

window.onload = function() {
    
    const shipList = $('#shipList');

    $.each(ships, (shipIdx, shipDto) => {
        shipList.append($('<option>', { value: shipDto.id, text: shipDto.name }));
    });
}

let marker;
function initMap() {

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 36.014, lng: 129.39734 },
        minZoom: 6,
        maxZoom: 18,
        mapTypeControl: false,  // 맵 타입 컨트롤
        streetViewControl: false,  // 거리 뷰 컨트롤
        fullscreenControl: false,  // 전체 보기 컨트롤
        zoomControl: false  // 확대/축소 컨트롤
    });

    $('#showMarker').on('click', function() {

        if (marker) marker.setMap(null);
        
        const shipId = $('#shipList').val();
        const shipDto = ships[shipId - 1];
        const shipCurrent = shipDto.current;

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(shipCurrent.lat, shipCurrent.lon),
            map,
            title: shipDto.name
        });
    });
}