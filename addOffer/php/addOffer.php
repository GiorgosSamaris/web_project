<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $product_id = $_POST['product_id'] ?? '';
    $user_id = $_POST['user_id'] ?? '';
    $price = $_POST['price'] ?? '';
    $store_id = $_POST['store_id'] ?? '';
    $offer_rating = $conn->prepare("CALL new_offer(?,?,?,?);");
    $offer_rating->bind_param("iiid", $product_id,$store_id,$user_id,$price);
    if ($offer_rating->execute()) {
        if($offer_rating->affected_rows > 0){ 
        $response = array(
            "message" => "Offer inserted successfully",
            "data" => array(
                "product_id" => $product_id,
                "user_id" => $user_id,
                "price" => $price,
                "store_id" => $store_id
            )
        );
        }
        else{
            $response = array(
                "message" => "Could not create offer because there is a better offer active on this product",
                "data" => array(
                    "product_id" => $product_id,
                    "user_id" => $user_id,
                    "price" => $price,
                    "store_id" => $store_id
                )
            );
        }
    }
    else{
        $response = array(
            "message" => "Operation failed",
            "data" => array(
                "product_id" => $product_id,
                "user_id" => $user_id,
                "price" => $price,
                "store_id" => $store_id
            )
        );
    }
    echo json_encode($response);
} else {
    echo json_encode(array("error" => "Invalid request method"));
}
?>