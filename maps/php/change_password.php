<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
// header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__).'/../azureConnection/azureConn.php');



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $password = $_POST['newPassword'] ?? '';
    $user_id = $_POST['userId'] ?? '';
    $password = mysqli_real_escape_string($conn, $password);
    $password_change = $conn->prepare("CALL change_password(?,?);");
    $password_change->bind_param("si",  $password, $user_id );
    if ($password_change->execute()) {
        $password_change = $password_change->get_result();
        $result = $password_change->fetch_assoc();
        echo json_encode($result);
    } 
    else {
        echo "could not execute";
    }
    }
    else {
        echo "invalid request method";
    }

?>