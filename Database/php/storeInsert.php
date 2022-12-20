<?php
//connection arguments
$servername = "localhost";
$username = "phpClient";
$password = "$0ftK1ngsPhP";
$dbname = "GoCart";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
    print_r("OH NO!");
}

//Get file data
$file = file_get_contents('json/export.geojson');
$parsed_file = json_decode($file, true);
$parsed_stores = $parsed_file['features'];

//Declare prepared insert statement
$store_insert = $conn->prepare("INSERT INTO `store` (`store_name`, `longtitude`, `latitude`, `map_id`) VALUES (?, ?, ?, ?);");
$store_insert->bind_param("sdds", $store_name, $longtitude, $latitude, $map_id);

$store_count = 0;
foreach($parsed_stores as $store){
    $store_properties = $store['properties'];
    if(array_key_exists('name', $store_properties)){
        $store_name = $store_properties['name'];
    }
    else{
        $store_name = "Unknown";
    }   
    $map_id = $store['id'];
    $longtitude = $store['geometry']['coordinates'][0];
    $latitude = $store['geometry']['coordinates'][1];
    $store_insert->execute();
    $store_count++;
}

print_r("Number of stores inserted: ");
print_r($store_count);
print_r("\n");

$store_insert->close();
$conn->close();
?>