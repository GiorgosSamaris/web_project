<?php
include 'localhostConn.php';
// include 'azureConn.php'
//Get file data
$file = file_get_contents('json/export.geojson');
$parsed_file = json_decode($file, true);
$parsed_stores = $parsed_file['features'];

//Declare prepared insert statement
// $store_insert = $conn->prepare("INSERT INTO `store` (`store_name`, `longitude`, `latitude`, `map_id`, `address`) VALUES (?, ?, ?, ?,?);");
// $store_insert->bind_param("sddss", $store_name, $longitude, $latitude, $map_id, $address);
$store_insert = $conn->prepare("UPDATE store SET address = ? WHERE store_id = ?");
$store_insert->bind_param("si",$address, $store_count);
$store_count = 1;
foreach($parsed_stores as $store){
    $store_properties = $store['properties'];
    if(array_key_exists('name', $store_properties)){
        $store_name = $store_properties['name'];
    }
    else{
        $store_name = "Unknown";
    }  
    if(array_key_exists('addr:street', $store_properties)){
        $address = $store_properties['addr:street'];
    }
    else{
        $address = "Unknown";
    }   
    $map_id = $store['id'];
    $longitude = $store['geometry']['coordinates'][0];
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