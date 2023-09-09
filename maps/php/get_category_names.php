<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($categories = $conn->query("SELECT name FROM category")) {
        $categories = mysqli_fetch_all($categories, MYSQLI_ASSOC);
        echo json_encode($categories, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>