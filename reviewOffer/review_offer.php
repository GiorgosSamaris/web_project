<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include(dirname(__DIR__).'/azureConnection/azureConn.php');


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $likes = $conn->prepare()
}
else 
{

}

?>