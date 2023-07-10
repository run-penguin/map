<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link rel="stylesheet" href="/css/index.css"></link>
</head>
<body>

    <div class="wrap">
        <div id="map">

        </div>
    </div>
    


    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>

    <script src="/js/index.js"></script>

    <!-- google map -->
	<script defer src="https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callback=initMap"></script>

    
</body>
</html>