<?php
include 'localhostConn.php';
// include 'azureConn.php'
//Get file data
$file = file_get_contents('json/dumpPrices.json');
$parsed_file = json_decode($file, true);
$parsed_prod_data = $parsed_file['data'];

//Declare prepared insert statement
$prod_insert = $conn->prepare("INSERT INTO `price_history` (`product_id`, `price_date`, `average_price`) VALUES (?, ?, ?);");
$prod_insert->bind_param("isd", $product_id, $date, $avg_price);

$price_count = 0;
$product_iter = 1;
foreach($parsed_prod_data as $product_data){
    foreach($product_data['prices'] as $price){
        $product_id = $product_iter;
        $date = $price['date'];
        $avg_price = $price['price'];
        $prod_insert->execute();
        $price_count++; 
    }
    $product_iter++;
}
print_r("Number of entries inserted: ");
print_r($price_count);
print_r("\n");
$prod_insert->close();
?>