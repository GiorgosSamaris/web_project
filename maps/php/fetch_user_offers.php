<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_POST['userId'] ?? '';
    // $user_id = 1;
    $user_offers = $conn->prepare("SELECT o.offer_id, p.name, u.username, c.overall_score, p.product_id, o.offer_price, o.number_of_likes, o.number_of_dislikes, o.in_stock, o.creation_date,o.price_decrease_last_day_avg, o.price_decrease_last_week_avg, o.store_id, o.active
                                    from offer as o INNER JOIN product as p ON p.product_id = o.product_id
                                    INNER JOIN customer as c ON c.customer_id = o.author_id
                                    INNER JOIN user as u ON c.customer_id = u.user_id
                                    where author_id = ?;");
    $user_offers->bind_param("i", $user_id);
    if ($user_offers->execute()) {
        $user_offers = $user_offers->get_result();
        $user_offers = mysqli_fetch_all($user_offers, MYSQLI_ASSOC);
        echo json_encode($user_offers, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>