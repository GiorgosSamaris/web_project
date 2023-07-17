<?php
    // connection arguments
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
    // $conn = mysqli_init();
    // mysqli_ssl_set($conn,NULL,NULL, "/home/ptriantafy/Downloads/DigiCertGlobalRootCA.crt.pem", NULL, NULL);
    // mysqli_real_connect($conn, "gocart.mysql.database.azure.com", "goCartDevTeam", "softk1ng\$d3v", "gocart", 3306, MYSQLI_CLIENT_SSL);
    $testusername =$_POST['usrn'];
    $testemail = $_POST['Email'];
    $testpass = $_POST['pswr'];
    // $testusername ="testusername12";
    // $testemail = "testemail2";
    // $testpass = "testpasword";

    $testusername = stripcslashes($testusername);  
    $testemail = stripcslashes($testemail);  
    $testpass = stripcslashes($testpass);  
    $testusername = mysqli_real_escape_string($conn, $testusername);  
    $testemail = mysqli_real_escape_string($conn, $testemail);  
    $testpass = mysqli_real_escape_string($conn, $testpass);  

    $reg_cust = $conn->prepare("CALL register_customer(?, ?, ?);");
    $reg_cust->bind_param("sss", $testusername, $testemail, $testpass);
    $reg_cust->execute();

?>