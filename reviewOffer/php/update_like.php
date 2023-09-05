<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
include(dirname(__DIR__).'/../azureConnection/azureConn.php');
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $offer_id = $_POST['offer_id'] ?? '';
    $user_id = $_POST['user_id'] ?? '';
    $offer_rating = $conn->prepare("CALL like_offer(?,?);");
    $offer_rating->bind_param("ii", $offer_id,$user_id);
    if ($offer_rating->execute()) {
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