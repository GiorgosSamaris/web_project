<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>
<h1>Gamiesai</h1>


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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$username = $_POST["usrn"];
	$password = $_POST["pswr"];
    $email = $_POST["email"]
	$stmt = $conn->prepare("CALL register_customer(?, ?, ?);");
	$store_insert->bind_param("sss", $username, $email, $password);
    $stmt->execute();
}
$store_insert->close();
$conn->close();
?>
</body>
</html>
