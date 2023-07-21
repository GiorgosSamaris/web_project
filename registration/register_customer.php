<?php 
//connection arguments
$servername = "localhost";
$username = "phpClient";
$password = "$0ftK1ngsPhP";
$dbname = "GoCart";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
    print_r("OH NO!");
}
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$username = stripcslashes($username);  
$email = stripcslashes($email);  
$password = stripcslashes($password);  
$username = mysqli_real_escape_string($conn, $username);  
$email = mysqli_real_escape_string($conn, $email);  
$password = mysqli_real_escape_string($conn, $password);  

$reg_cust = $conn->prepare("CALL register_customer(?, ?, ?);");
$reg_cust->bind_param("sss", $username, $email, $password);
$reg_cust->execute();
?>