<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $priceFile = $_FILES['priceFile'];

    if ($priceFile['error'] === UPLOAD_ERR_OK) {
        $priceTmpName = $priceFile['tmp_name'];
        $priceDest = (__DIR__).'/uploads/prices.json';
        if (!file_exists((__DIR__).'/uploads/')) {
            mkdir((__DIR__).'/uploads/');
        }
        if (move_uploaded_file($priceTmpName, $priceDest)) {
            echo "Price uploaded successfully.";
            // call php script to parse json and insert into database
        } else {
            echo "Error moving file: ";
        }
        
    } else {
        echo "Error uploading file.";
    }
} else {
    echo "Invalid request method.";
}
?>
