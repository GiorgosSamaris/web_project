<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
// include(dirname(__DIR__).'/azureConnection/azureConn.php');
$servername = "localhost";
$dbusername = "phpClient";
$dbpassword = "$0ftK1ngsPhP";
$dbname = "GoCart";
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
    print_r("OH NO!");
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $store_id = $_POST['store_id'] ?? '';
    // $store_id = 1;
    $store_inventory = $conn->prepare("SELECT p.name as product, s.name as subcategory, c.name as category, i.inventory_price as price 
                                FROM product as p INNER JOIN subcategory as s ON p.subcategory_id = s.subcategory_id 
                                INNER JOIN category as c ON s.category_id = c.category_id 
                                INNER JOIN inventory as i ON p.product_id = i.product_id WHERE i.store_id = ?;
                                ");
    $store_inventory->bind_param("i", $store_id);
    if ($store_inventory->execute()) {
        $store_inventory_result = $store_inventory->get_result();
        $store_inventory = mysqli_fetch_all($store_inventory_result, MYSQLI_ASSOC);
        echo json_encode($store_inventory, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
$conn->close(); 
?>