<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_POST['userId'] ?? '';
    //$user_id = 203;
    $username = $conn->prepare("SELECT username FROM user WHERE user_id = ?;");
    $username->bind_param("i", $user_id);
    if ($username->execute()) {
        $username = $username->get_result();
        $username = mysqli_fetch_all($username, MYSQLI_ASSOC);
        echo json_encode($username, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }

    ?>