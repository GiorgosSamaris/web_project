<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $storeFile = $_FILES['storeFile'];

    if ($storeFile['error'] === UPLOAD_ERR_OK) {
        $storeTmpName = $storeFile['tmp_name'];
        $storeDest = (__DIR__).'/uploads/store.geojson';
        if (!file_exists((__DIR__).'/uploads/')) {
            mkdir((__DIR__).'/uploads/');
        }
        if (move_uploaded_file($storeTmpName, $storeDest)) {
            echo "store uploaded successfully.";
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
