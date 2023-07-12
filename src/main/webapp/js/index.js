


const ships = [
    { id: 1, name: '테스트 선박1', current: { lat: 36.5, lon: 130.39, hdt: 0 } },
    { id: 2, name: '테스트 선박2', current: { lat: 36.0, lon: 130.39, hdt: 45 } },
    { id: 3, name: '테스트 선박3', current: { lat: 35.5, lon: 130.39, hdt: 90 } }
];

window.onload = function() {
    
    const shipList = document.getElementById('shipList');

    ships.forEach((shipDto) => {
        const opt = document.createElement('option');
        opt.setAttribute('value', shipDto.id);
        opt.innerText = shipDto.name;
        shipList.append(opt);
    });
}

let map;
let marker;
let overlay;
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 36.014, lng: 129.39734 },
        minZoom: 6,
        maxZoom: 18,
        mapTypeControl: false,  // 맵 타입 컨트롤
        streetViewControl: false,  // 거리 뷰 컨트롤
        fullscreenControl: false,  // 전체 보기 컨트롤
        zoomControl: false  // 확대/축소 컨트롤
    });

    class CustomOverlay extends google.maps.OverlayView {

        constructor(dto) {
            super();
            this.div = null;
            this.dto = dto;
            this.position = new google.maps.LatLng(this.dto.current.lat, this.dto.current.lon);
        }
    
        onAdd() {

            if (overlay) overlay.onRemove();
            
            const divShip = document.createElement('div');
            divShip.setAttribute('data-id', this.dto.id);
            divShip.className = 'js-ship';
            this.div = divShip;

            const imgShip = document.createElement('img');
            imgShip.setAttribute('src', '/images/vessel_blue.svg');
            imgShip.className = 'js-ship-img';
            divShip.append(imgShip);

            const lbName = document.createElement('label');
            lbName.className = 'js-ship-name';
            lbName.innerText = this.dto.name;
            divShip.append(lbName);

            const imgActive = document.createElement('img');
            imgActive.setAttribute('src', '/images/ico_ship_active.png');
            imgActive.className = 'js-ship-active';
            divShip.append(imgActive);
    
            const panes = this.getPanes();
            panes.overlayLayer.appendChild(this.div);

            this.getPanes().overlayMouseTarget.appendChild(this.div);
        }

        draw() {
            if (this.div) {
                
                const projection = this.getProjection();
                const pixel = projection.fromLatLngToDivPixel(this.position);

                this.div.style.left = pixel.x + 'px';
                this.div.style.top = pixel.y + 'px';

                const shipMarker = this.div.querySelector('.js-ship-img');
                shipMarker.setAttribute('style', `transform:translate(-50%, -50%) rotate(${this.dto.current.hdt}deg)`);
            }
        }

        onRemove() {
            if (this.div) {
                this.div.parentNode.removeChild(this.div);
                delete this.div;
            }
        }
    }


    document.getElementById('showMarker').addEventListener('click', function() {

        if (marker) marker.setMap(null);

        if (overlay) {
            // overlay.onRemove();
            const oldOverlay = overlay;
            overlay = null;

            oldOverlay.onRemove();
        }
        
        const shipId = document.getElementById('shipList').value;
        const shipDto = ships[shipId - 1];
        const shipCurrent = shipDto.current;

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(shipCurrent.lat, shipCurrent.lon),
            map,
            title: shipDto.name
        });
    });

    document.getElementById('showOverlay').addEventListener('click', function() {

        if (marker) marker.setMap(null);

        if (overlay) {
            // overlay.onRemove();
            const oldOverlay = overlay;
            overlay = null;

            oldOverlay.onRemove();
        }

        const shipId = document.getElementById('shipList').value;
        const shipDto = ships[shipId - 1];

        const newOverlay = new CustomOverlay(shipDto);
        newOverlay.setMap(map);
        overlay = newOverlay;
    });
}