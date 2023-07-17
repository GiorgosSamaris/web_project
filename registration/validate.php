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
	$username = $_POST["username"];
	$password = $_POST["password"];
	$stmt = $conn->prepare("CALL validate_user(?, ?, ?);");
	$store_insert->bind_param("ssi", $username, $password, $valid);
    $stmt->execute();
}
if($valid){
    header("Location: maps.html");
}
else{
    echo "paixtike malakia";
}

$store_insert->close();
$conn->close();
?>
