<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
include(dirname(__DIR__).'/../azureConnection/azureConn.php');
// include 'localhostConn.php';



if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $statement = $conn->query("CALL products_temp_merge();");

    if ($statement) {
       echo "products temp merged";
       
    } 
    else {
        echo "could not execute";
    }

    $statement = $conn->query("CALL products_price_temp_merge();");

    if ($statement) {
        echo "products temp merged";
    } 
    else {
        echo "could not execute";
    }
        echo "products temp merged";
    }
    else {
        echo "invalid request method";
    }
?>