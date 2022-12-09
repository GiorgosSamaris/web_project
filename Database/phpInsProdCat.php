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

$file = file_get_contents('products.json');
$parsed_file = json_decode($file, true);
$parsed_products = $parsed_file['products'];
$parsed_categories = $parsed_file['categories'];

$cat_index = 1;
$subcat_index = 1;

//Prepared insert statements
$cat_insert = $conn->prepare("INSERT INTO `category` (`name`) VALUES (?);");
$cat_insert->bind_param("s", $cat_name);
$subcat_insert = $conn->prepare("INSERT INTO `subcategory` (`category_id`, `name`) VALUES (?, ?);");
$subcat_insert->bind_param("is", $cat_id, $subcat_name);
$prod_insert = $conn->prepare("INSERT INTO `product` (`subcategory_id`, `name`) VALUES (?, ?);");
$prod_insert->bind_param("is", $subcat_id, $prod_name);

//iterate and insert all categories and subcategories
foreach($parsed_categories as $category){
    $cat_id = $cat_index;
    $cat_name = $category['name'];
    $cat_insert->execute();
    foreach($category['subcategories'] as $subcategory){
        $subcat_name = $subcategory['name'];
        $subcat_insert->execute();
        $subcat_index++;
    }
    $cat_index++;
}

//iterate and insert all products
foreach($parsed_products as $product){
    $subcat_index = 1;
    foreach($parsed_categories as $category){
        foreach($category['subcategories'] as $subcategory){
            //find in which subcategory it belongs to
            if(strcmp($subcategory['uuid'], $product['subcategory']) != 0){
                $subcat_index++;
                continue;
            }
            $subcat_id = $subcat_index;
            $prod_name = $product['name'];
            $prod_insert->execute();
        }
    }
}

//close statements and connection
$cat_insert->close();
$subcat_insert->close();
$prod_insert->close();
$conn->close(); 
?>   