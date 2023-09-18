<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $store_id = $_POST['storeId'] ?? '';
    // $store_id = 1;
    $store_offers = $conn->prepare("SELECT o.offer_id, p.name, cat.name as category_name, u.username, c.overall_score, p.product_id, o.offer_price, o.number_of_likes, o.number_of_dislikes, o.in_stock, o.creation_date,o.price_decrease_last_day_avg, o.price_decrease_last_week_avg, o.store_id 
                                    from offer as o INNER JOIN product as p ON p.product_id = o.product_id
                                    INNER JOIN subcategory as s ON s.subcategory_id = p.subcategory_id
                                    INNER JOIN category as cat ON cat.category_id = s.category_id
                                    INNER JOIN customer as c ON c.customer_id = o.author_id
                                    INNER JOIN user as u ON c.customer_id = u.user_id
                                    where store_id = ? AND o.active = 1;");
    $store_offers->bind_param("i", $store_id);
    if ($store_offers->execute()) {
        $store_offers = $store_offers->get_result();
        $store_offers = mysqli_fetch_all($store_offers, MYSQLI_ASSOC);
        echo json_encode($store_offers, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>