<?php
	$request_body = file_get_contents('php://input');
	$data = json_decode($request_body);
	$longitude = $data->longitude;
	$latitude = $data->latitude;
	$radius = $data->radius;
	$type = $data->type;

	include 'GooglePlaces.php';
	include 'GooglePlacesClient.php';
	$google_places = new joshtronic\GooglePlaces('AIzaSyB93fKBqB2tVEJh3PBA3LV0n4Jl8bJIL3w');
	$google_places->location = array($longitude, $latitude);
	$google_places->radius   = $radius;
	$google_places->types    = $type;
	$results                 = $google_places->nearbySearch();
	header('Content-Type: application/json');
	header('Access-Control-Allow-Origin: *'); 
	echo json_encode($results);
