<?php
$conn = mysqli_init();
// mysqli_ssl_set($conn,NULL,NULL, (__DIR__)."/cacert-2023-05-30.pem", NULL, NULL); // removed for speedup
mysqli_real_connect($conn, "p:gocart.mysql.database.azure.com", "goCartDevTeam", "softk1ng\$d3v", "gocart", 3306);
// , MYSQLI_CLIENT_SSL
?>