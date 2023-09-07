<?php
header('Content-Type: application/json; charset=utf-8');
include(dirname(__DIR__) . '/../azureConnection/azureConn.php');

$result = $conn->query("SELECT * FROM store;");
$features = array();

while ($row = $result->fetch_assoc()) {
    // Query the distinct categories in the store's inventory
    $inventoryQuery = "SELECT DISTINCT c.name AS category_name 
                       FROM inventory i
                       INNER JOIN product p ON i.product_id = p.product_id
                       INNER JOIN subcategory s ON p.subcategory_id = s.subcategory_id
                       INNER JOIN category c ON s.category_id = c.category_id
                       WHERE i.store_id = {$row['store_id']}";
    $inventoryResult = $conn->query($inventoryQuery);

    // Create an array to store distinct categories
    $distinctCategories = array();
    while ($inventoryRow = $inventoryResult->fetch_assoc()) {
        $distinctCategories[] = $inventoryRow['category_name'];
    }

    $feature = array(
        'type' => 'Feature',
        'geometry' => array(
            'type' => 'Point',
            'coordinates' => array((float) $row['longitude'], (float) $row['latitude']),
        ),
        'properties' => array(
            'store_id' => $row['store_id'],
            'store_name' => $row['store_name'],
            'has_active_offers' => checkIfStoreHasActiveOffers($conn, $row['store_id']), // Add the boolean property
            'address' => $row['address'],
            'distinct_categories' => $distinctCategories, // Add the array of distinct categories
            // Add other properties here
        ),
    );
    $features[] = $feature;
}

$geojson = array(
    'type' => 'FeatureCollection',
    'features' => $features,
);

$json = json_encode($geojson, JSON_UNESCAPED_UNICODE);
file_put_contents(__DIR__ . '/../json/stores.geojson', $json);

function checkIfStoreHasActiveOffers($conn, $storeID)
{
    // Query the 'Offer' table to check if the store has active offers
    $query = "SELECT COUNT(*) AS active_offer_count FROM offer WHERE store_id = $storeID AND active = TRUE";
    $result = $conn->query($query);
    if ($result && $row = $result->fetch_assoc()) {
        return $row['active_offer_count'] > 0;
    }
    return false;
}
?>
