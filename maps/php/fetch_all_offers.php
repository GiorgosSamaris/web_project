<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');
// $servername = "localhost";
// $dbusername = "phpClient";
// $dbpassword = "$0ftK1ngsPhP";
// $dbname = "GoCart";
// $conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);
// if ($conn->connect_error){
//     die("Connection failed: " . $conn->connect_error);
//     print_r("OH NO!");
// }

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($all_offers = $conn->query("SELECT o.offer_id, p.name, u.username, c.overall_score, p.product_id, o.offer_price, o.number_of_likes, o.number_of_dislikes, o.in_stock, o.creation_date,o.price_decrease_last_day_avg, o.price_decrease_last_week_avg, o.store_id 
            from offer as o INNER JOIN product as p ON p.product_id = o.product_id INNER JOIN customer as c ON c.customer_id = o.author_id 
            INNER JOIN user as u ON c.customer_id = u.user_id")) {
        $all_offers = mysqli_fetch_all($all_offers, MYSQLI_ASSOC);
        echo json_encode($all_offers, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>