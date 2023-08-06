<?php 
header('Content-Type: application/json; charset=utf-8');
$servername = "localhost";
$username = "phpClient";
$password = "$0ftK1ngsPhP";
$dbname = "GoCart";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");
// Check connection
if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
    print_r("OH NO!");
}
$result = $conn->query("SELECT * FROM store;", MYSQLI_USE_RESULT);
$result= mysqli_fetch_all($result, MYSQLI_ASSOC);
$result = json_encode($result, JSON_UNESCAPED_UNICODE);
file_put_contents(__DIR__.'/../json/stores.json', $result);
?>