<?php 
header('Content-Type: application/json; charset=utf-8');
$servername = "localhost";
$username = "phpClient";
$password = "$0ftK1ngsPhP";
$dbname = "GoCart";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->set_charset("utf8");
// Check connection
if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
    print_r("OH NO!");
}
$result = $conn->query("SELECT username, offer_id, creation_date, expiration_date, number_of_likes, number_of_dislikes, offer_price, in_stock, store_name, name FROM user as u INNER JOIN customer as c ON u.user_id = c.customer_id INNER JOIN offer as o ON c.customer_id = o.author_id INNER JOIN product as p ON o.product_id = p.product_id INNER JOIN store as s ON o.store_id = s.store_id;", MYSQLI_USE_RESULT);
$result= mysqli_fetch_all($result, MYSQLI_ASSOC);
$result = json_encode($result, JSON_UNESCAPED_UNICODE);
file_put_contents(__DIR__.'/../json/offers.json', $result);
?>