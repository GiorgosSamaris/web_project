<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($stores = $conn->query("select distinct store_name from store")) {
        $stores = mysqli_fetch_all($stores, MYSQLI_ASSOC);
        echo json_encode($stores, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>