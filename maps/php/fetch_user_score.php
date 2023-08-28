<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $user_id = $_POST['userId'] ?? '';
    //$user_id = 203;
    $user_score = $conn->prepare("CALL user_score(?)");
    $user_score->bind_param("i", $user_id);
    if ($user_score->execute()) {
        $user_score = $user_score->get_result();
        $user_score = mysqli_fetch_all($user_score, MYSQLI_ASSOC);
        echo json_encode($user_score, JSON_UNESCAPED_UNICODE);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }

    ?>