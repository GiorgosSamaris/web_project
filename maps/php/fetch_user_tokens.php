<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_POST['userId'] ?? '';
    //$user_id = 203;
    $user_tokens = $conn->prepare("CALL user_tokens(?)");
    $user_tokens->bind_param("i", $user_id);
    if ($user_tokens->execute()) {
        $user_tokens = $user_tokens->get_result();
        $user_tokens = mysqli_fetch_all($user_tokens, MYSQLI_ASSOC);
        echo json_encode($user_tokens, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }

    ?>