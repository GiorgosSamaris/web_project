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
?>