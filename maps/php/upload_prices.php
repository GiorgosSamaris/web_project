<?php
// include('../../Database/php/jsonUploader.php');
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
            shell_exec('php jsonUploader.php uploads/prices.json');
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
