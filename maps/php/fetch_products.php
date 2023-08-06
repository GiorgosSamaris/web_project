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
$result = $conn->query("SELECT product.name as product, subcategory.name as subcategory, category.name as category FROM product INNER JOIN subcategory ON product.subcategory_id = subcategory.subcategory_id INNER JOIN category ON subcategory.category_id = category.category_id;
", MYSQLI_USE_RESULT);
$result= mysqli_fetch_all($result, MYSQLI_ASSOC);
$result = json_encode($result, JSON_UNESCAPED_UNICODE);
file_put_contents(__DIR__.'/../json/products.json', $result);
?>