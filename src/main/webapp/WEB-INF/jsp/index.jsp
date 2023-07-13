<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="/css/index.css"></link>
</head>
<body>

    <div class="wrap">
        <div class="header">

            <div class="row">
                <div class="col-auto">
                    <select id="shipList" class="form-select"></select>
                </div>
                <div class="col-auto">
                    <button id="showMarker" class="btn btn-primary">Marker</button>
                    <button id="showOverlay" class="btn btn-primary">Custom Overlay</button>
                    <button id="showRoute" class="btn btn-primary">Route</button>
                    <button id="clear" class="btn btn-light">Clear</button>
                </div>
                <div class="col-auto">
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Weather</button>
                        <ul class="dropdown-menu">
                            <li>
                                <button type="button" class="dropdown-item js-weather" value="1">Cloud (구름)</button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item js-weather" value="2">Precipitation (강수)</button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item js-weather" value="3">Atm press. (기압)</button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item js-weather" value="4">Wind (풍속)</button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item js-weather" value="5">Temp. (온도)</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="map">

        </div>
    </div>
    


    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>

    <!-- google map -->
	<script defer src="https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callback=initMap"></script>

    <script src="/js/index.js"></script>

    
</body>
</html>