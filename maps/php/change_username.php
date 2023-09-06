<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
// header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['newUsername'] ?? '';
    $user_id = $_POST['userId'] ?? '';
    $username = mysqli_real_escape_string($conn, $username);
    $username_change = $conn->prepare("CALL change_username(?,?);");
    $username_change->bind_param("si",  $username, $user_id );
    if ($username_change->execute()) {
        echo "success";
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }

    ?>