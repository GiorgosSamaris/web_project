<?php
include(dirname(__DIR__) . '/../azureConnection/azureConn.php');
$result = $conn->query("SELECT * FROM store;");
$features = array();
while ($row = $result->fetch_assoc()) {
    $inventoryQuery = "SELECT DISTINCT c.name AS category_name 
                       FROM inventory i
                       INNER JOIN product p ON i.product_id = p.product_id
                       INNER JOIN subcategory s ON p.subcategory_id = s.subcategory_id
                       INNER JOIN category c ON s.category_id = c.category_id
                       WHERE i.store_id = {$row['store_id']}";
    $inventoryResult = $conn->query($inventoryQuery);

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
            'has_active_offers' => checkIfStoreHasActiveOffers($conn, $row['store_id']),
            'address' => $row['address'],
            'distinct_categories' => $distinctCategories,
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
    $query = "SELECT COUNT(*) AS active_offer_count FROM offer WHERE store_id = $storeID AND active = TRUE";
    $result = $conn->query($query);
    if ($result && $row = $result->fetch_assoc()) {
        return $row['active_offer_count'] > 0;
    }
    return false;
}
?>
