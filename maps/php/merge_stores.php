<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
include(dirname(__DIR__).'/../azureConnection/azureConn.php');
// include 'localhostConn.php';



if ($_SERVER["REQUEST_METHOD"] === "POST") {
   $statement = $conn->query("CALL store_temp_merge();");

    if ($statement) {
       echo "stores temp merged";
       
    } 
    else {
        echo "could not execute";
    }
    
}

else {
    echo "invalid request method";
}



?>