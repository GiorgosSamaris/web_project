<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
include(dirname(__DIR__).'/azureConnection/azureConn.php');
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
    $valid = 0;
    $isAdmin = 0;
    // Retrieve form data
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $username = mysqli_real_escape_string($conn, $username);  
    $password = mysqli_real_escape_string($conn, $password);  
    
    $log_user = $conn->prepare("CALL validate_user(?, ?);");
    $log_user->bind_param("ss", $username, $password);
    if ($log_user->execute()) {
        $log_user = $log_user->get_result();
        $result = $log_user->fetch_assoc();
        $valid = $result['valid'];
        $isAdmin = $result['admn'];
        if($valid){
            if($isAdmin){
                $response = array(
                    'status' => "success",
                    'message' => "Login successful! Welcome, $username!",
                    'type' => "admin"
                );
            }
            else{
                $response = array(
                    'status' => "success",
                    'message' => "Login successful! Welcome, $username!",
                    'type' => "customer"
                );
            }
        }
        else{
            $response = array(
                'status' => "fail",
                'message' => "Incorrect username-password combination",
                'type' => 'noop'
            );
        }
        echo json_encode($response);
    } 
    else {
        $response = array(
            'status' => "fail",
            'message' => "Unexpected error, please try again",
            'type' => 'noop'
        );
        echo json_encode($response);
    }
    }
    else {
    $response = array(
        'status' => 'fail',
        'message' => "Invalid request method.",
        'type' => 'noop'
    );
    echo json_encode($response);
}
?>