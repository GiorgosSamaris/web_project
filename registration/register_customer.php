<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
// include __DIR__ .'/../Database/php/localhostConn.php';
//connection arguments
$servername = "localhost";
$dbusername = "phpClient";
$dbpassword = "$0ftK1ngsPhP";
$dbname = "GoCart";

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error){
    die("Connection failed: " . $conn->connect_error);
    print_r("OH NO!");
}

// Check if the request is a POST request
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve form data
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $email = $_POST['email'] ?? '';
    // var_dump($username, $password, $email);
    $username = mysqli_real_escape_string($conn, $username);  
    $email = mysqli_real_escape_string($conn, $email);  
    $password = mysqli_real_escape_string($conn, $password);  
    // error_log("Received form data - Username: $username, Password: $password, Email: $email", 0);
    $username_exists = $conn->prepare("SELECT COUNT(*) AS username_count FROM user WHERE username = ?");
    $username_exists->bind_param("s", $username);
    $username_exists->execute();
    $username_exists = $username_exists->get_result();
    $username_exists = $username_exists->fetch_assoc()['username_count'] > 0;
    
    // Check if the email already exists in the database
    $email_exists = $conn->prepare("SELECT COUNT(*) AS email_count FROM customer WHERE email = ?");
    $email_exists->bind_param("s", $email);
    $email_exists->execute();
    $email_exists = $email_exists->get_result();
    $email_exists = $email_exists->fetch_assoc()['email_count'] > 0;
    
    if (!$username_exists && !$email_exists) {
        $reg_cust = $conn->prepare("CALL register_customer(?, ?, ?);");
        $reg_cust->bind_param("sss", $username, $email, $password);
    
        if ($reg_cust->execute()) {
            $response = array(
                'status' => 'success',
                'message' => "Registration successful! Welcome, $username!"
            );
        } else {
            $response = array(
                'status' => 'fail',
                'message' => "Unexpected Error. Please try again later."
            );
        }
} else {
    if ($username_exists && $email_exists) {
        $response = array(
            'status' => 'fail',
            'message' => "Username and email already exist."
        );
    } elseif ($username_exists) {
        $response = array(
            'status' => 'fail',
            'message' => "Username already exists."
        );
    } else {
        $response = array(
            'status' => 'fail',
            'message' => "Email already exists."
        );
    }
}

echo json_encode($response);

} else {
    $response = array(
        'status' => 'fail',
        'message' => "Invalid request method."
    );
    echo json_encode($response);
}
?>
