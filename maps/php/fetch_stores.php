<?php 
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');
// $servername = "localhost";
// $username = "phpClient";
// $password = "$0ftK1ngsPhP";
// $dbname = "GoCart";

// // Create connection
// $conn = new mysqli($servername, $username, $password, $dbname);
// $conn->set_charset("utf8");
// // Check connection
// if ($conn->connect_error){
//     die("Connection failed: " . $conn->connect_error);
//     print_r("OH NO!");
// }

$result = $conn->query("SELECT * FROM store;");
$features = array();
// foreach row
while ($row = $result->fetch_assoc()) {
    $feature = array(
        'type' => 'Feature',
        'geometry' => array(
            'type' => 'Point',
            // cast to float
            'coordinates' => array((float)$row['longitude'], (float)$row['latitude']),
        ),
        'properties' => $row,
    );
    // append to array
    $features[] = $feature;
}

$geojson = array(
    'type' => 'FeatureCollection',
    'features' => $features,
);

$json = json_encode($geojson, JSON_UNESCAPED_UNICODE);
file_put_contents(__DIR__.'/../json/stores.geojson', $json);
$conn->close();
// echo $json;
?>
