


const ships = [
    { 
        id: 1, 
        name: '테스트 선박1', 
        current: { lat: 36.5, lon: 130.39, hdt: 0 },
        route: [
            { lat: 36.5, lon: 130.39 },
            { lat: 36.0, lon: 130.30 },
            { lat: 35.5, lon: 130.28 },
        ]
    },
    { 
        id: 2, 
        name: '테스트 선박2', 
        current: { lat: 36.0, lon: 130.39, hdt: 45 } 
    },
    { 
        id: 3, 
        name: '테스트 선박3', 
        current: { lat: 35.5, lon: 130.39, hdt: 90 } 
    }
];

window.onload = function() {
    
    const shipList = document.getElementById('shipList');

    ships.forEach((shipDto) => {
        const opt = document.createElement('option');
        opt.setAttribute('value', shipDto.id);
        opt.innerText = shipDto.name;
        shipList.append(opt);
    });

    addEvents();
}


let map;
let marker;
let overlay;
let cirs = [];
let outline; let innerline;
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


            // infoWindow
            const divInfo = document.createElement('div');
            divInfo.className = 'js-ship-info';

            const tbInfo = document.createElement('table');
            tbInfo.className = 'table';
            divInfo.append(tbInfo);

            const tbdInfo = document.createElement('tbody');
            tbInfo.append(tbdInfo);

            const trName = document.createElement('tr');
            tbdInfo.append(trName);

            const thName = document.createElement('th');
            thName.setAttribute('scope', 'row');
            thName.innerText = 'Name: ';
            trName.append(thName);

            const tdName = document.createElement('td');
            tdName.innerText = this.dto.name;
            trName.append(tdName);

            const trHdt = document.createElement('tr');
            tbdInfo.append(trHdt);

            const thHdt = document.createElement('th');
            thHdt.setAttribute('scope', 'row');
            thHdt.innerText = 'HDT: '
            trHdt.append(thHdt);

            const tdHdt = document.createElement('td');
            tdHdt.innerText = this.dto.current.hdt;
            trHdt.append(tdHdt);

            const infoWin = new google.maps.InfoWindow({
                content: divInfo,
                position: new google.maps.LatLng(this.dto.current.lat, this.dto.current.lon),
                shouldFocus: false
            });
            
            imgShip.addEventListener('mouseover', function() {
                infoWin.open(map);
            });

            imgShip.addEventListener('mouseout', function() {
                infoWin.close();
            });
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

    document.getElementById('showOverlay').addEventListener('click', function() {

        if (marker) marker.setMap(null);

        if (overlay) {
            overlay.onRemove();
            overlay = null;
        }

        const shipId = document.getElementById('shipList').value;
        const shipDto = ships[shipId - 1];

        overlay = new CustomOverlay(shipDto);
        overlay.setMap(map);
    });
}

function addEvents() {

    document.getElementById('showMarker').addEventListener('click', function() {

        clearMap();
        
        const shipId = document.getElementById('shipList').value;
        const shipDto = ships[shipId - 1];
        const shipCurrent = shipDto.current;

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(shipCurrent.lat, shipCurrent.lon),
            map,
            title: shipDto.name
        });
    });

    document.getElementById('showRoute').addEventListener('click', function() {
        
        const shipId = document.getElementById('shipList').value;
        const waypoints = ships[shipId - 1].route;

        let positions = [];

        waypoints.forEach((waypoint) => {

            const position = new google.maps.LatLng(waypoint.lat, waypoint.lon);
            positions.push(position);

            const cir = new google.maps.Marker({
                position: position,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    strokeColor: '#289bce',
                    strokeWeight: 2,
                    fillColor: '#40bdf4',
                    fillOpacity: 1,
                    scale: 4
                },
                map: map
            });
            cirs.push(cir);
        });

        outline = new google.maps.Polyline({
            path: positions,
            strokeColor: '#289bce',
            strokeOpacity: 1,
            strokeWeight: 5,
            zIndex: 5,
            cursor: 'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default'
        });
        outline.setMap(map);

        innerline = new google.maps.Polyline({
            path: positions,
            strokeColor: '#40bdf4',
            strokeOpacity: 1,
            strokeWeight: 3,
            zIndex: 5,
            cursor: 'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default'
        });
        innerline.setMap(map);
    });

    document.getElementById('clear').addEventListener('click', function() {
        clearMap();
    });

    document.querySelectorAll('.js-weather').forEach((ctl) => {
        ctl.addEventListener('click', function() {

            map.overlayMapTypes.clear();

            const url = 'https://tile.openweathermap.org/map';
            const appId = 'your app id';

            let layer;
            switch (Number(this.value)) {
                case 1:
                layer = '/clouds_new/';
                break;
            case 2:
                layer = '/precipitation_new/';
                break;
            case 3:
                layer = '/pressure_new/';
                break;
            case 4:
                layer = '/wind_new/';
                break;
            case 5:
                layer = '/temp_new/';
                break;
            }

            const type = new google.maps.ImageMapType({
                getTileUrl: (coord, zoom) => {
                    return `${url}${layer}${zoom}/${coord.x}/${coord.y}.png?appId=${appId}`
                },
                tileSize: new google.maps.Size(256, 256),
                maxZoom: 9,
                minZoom: 0,
                name: 'mapType'
            });

            map.overlayMapTypes.insertAt(0, type);
        });
    });
}

function clearMap() {

    if (marker) marker.setMap(null);

    if (overlay) {
        overlay.onRemove();
        overlay = null;
    }

    cirs.forEach((cir) => {
        cir.setMap(null);
    });
    cirs = [];

    if (outline) {
        outline.setMap(null);
        outline = null;
    }

    if (innerline) {
        innerline.setMap(null);
        innerline = null;
    }
}
