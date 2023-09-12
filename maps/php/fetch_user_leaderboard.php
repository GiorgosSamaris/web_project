<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($users = $conn->query("SELECT username, customer_id, email, overall_tokens, last_months_tokens, current_score, overall_score,register_date FROM customer INNER JOIN user ON customer_id = user_id ORDER BY overall_score DESC")) {
        $users = mysqli_fetch_all($users, MYSQLI_ASSOC);
        echo json_encode($users, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }
?>