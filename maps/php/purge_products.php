<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
// include(dirname(__DIR__).'/../azureConnection/azureConn.php');
// include 'localhostConn.php';



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $statement = $conn->query("DELETE FROM price_history;");
    $statement = $conn->query("DELETE FROM inventory;");
    $statement = $conn->query("DELETE FROM offer_rating;");
    $statement = $conn->query("DELETE FROM offer;");
    $statement = $conn->query("DELETE FROM product;");
    $statement = $conn->query("DELETE FROM subcategory;");
    $statement = $conn->query("DELETE FROM category;");
}

else {
    echo "invalid request method";
}



?>