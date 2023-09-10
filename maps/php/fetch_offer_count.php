<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($offer_count = $conn->query("SELECT DATE(creation_date) AS offer_date, COUNT(*) AS offer_count FROM offer GROUP BY offer_date ORDER BY offer_date;")) {
        $offer_count = mysqli_fetch_all($offer_count, MYSQLI_ASSOC);
        echo json_encode($offer_count, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>