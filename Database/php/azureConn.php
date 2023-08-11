<?php
$conn = mysqli_init();
mysqli_ssl_set($conn,NULL,NULL, "cacert-2023-05-30.pem", NULL, NULL);
mysqli_real_connect($conn, "gocart.mysql.database.azure.com", "goCartDevTeam", "softk1ng\$d3v", "gocart", 3306, MYSQLI_CLIENT_SSL);
?>