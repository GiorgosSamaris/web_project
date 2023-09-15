<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $productFile = $_FILES['productFile'];

    if ($productFile['error'] === UPLOAD_ERR_OK) {
        $productTmpName = $productFile['tmp_name'];
        $productDest = (__DIR__).'/uploads/products.json';
        if (!file_exists((__DIR__).'/uploads/')) {
            mkdir((__DIR__).'/uploads/');
        }
        if (move_uploaded_file($productTmpName, $productDest)) {
            echo "products uploaded successfully.";
            // call php script to parse json and insert into database
        } else {
            echo "Error moving files: ";
        }
        
    } else {
        echo "Error uploading files.";
    }
} else {
    echo "Invalid request method.";
}
?>
