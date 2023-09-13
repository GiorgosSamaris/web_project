<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $start_date = $_POST['start_date'] ?? '';
    $content_id = $_POST['content_id'] ?? '';
    $content_type = $_POST['content_type'] ?? '';
    if($content_type==="category"){
        $price_drop = $conn->prepare("CALL weekly_average_price_drop_category(?,?)");
        $price_drop->bind_param("ss", $content_id, $start_date);
    }
    else{
        $price_drop = $conn->prepare("CALL weekly_average_price_drop_subcategory(?,?)");
        $price_drop->bind_param("ss", $content_id, $start_date);
    }
    if ($price_drop->execute()) {
        $price_drop = $price_drop->get_result();
        $price_drop = mysqli_fetch_all($price_drop, MYSQLI_ASSOC);
        echo json_encode($price_drop, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }

?>