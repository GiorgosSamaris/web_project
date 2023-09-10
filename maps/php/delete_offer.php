<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
include(dirname(__DIR__).'/../azureConnection/azureConn.php');



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $offer_id = $_POST['offer_id'] ?? '';
    $delete_ratings = $conn->prepare("DELETE FROM offer_rating WHERE offer_id = ?;");
    $delete_offer = $conn->prepare("DELETE FROM offer WHERE offer_id = ?;");
    $delete_ratings->bind_param("i", $offer_id);
    $delete_offer->bind_param("i", $offer_id);
    if ($delete_ratings->execute() && $delete_offer->execute()) {
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