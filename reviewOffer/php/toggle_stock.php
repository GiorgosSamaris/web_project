<?php 


error_reporting(E_ALL);
ini_set('display_errors', 1);
include(dirname(__DIR__).'/../azureConnection/azureConn.php');


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $offer_id = $_POST['offer_id'] ?? '';
    $toggle_stock = $conn->prepare("UPDATE offer SET in_stock = NOT in_stock WHERE offer_id = ?;");
    $toggle_stock->bind_param("i",  $offer_id);
    if ($toggle_stock->execute()) {
        echo "success";
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>