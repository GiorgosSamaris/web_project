<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($subcategories = $conn->query("SELECT name, subcategory_id, category_id FROM subcategory")) {
        $subcategories = mysqli_fetch_all($subcategories, MYSQLI_ASSOC);
        echo json_encode($subcategories, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>