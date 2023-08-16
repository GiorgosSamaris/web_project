<?php

    $jsonPath = "json/dumpPrices.json";
    $jsonString = file_get_contents($jsonPath);
    
    //convert json to an assosiative array
    $jsonData = json_decode($jsonString, true);
    $prices = $jsonData["data"];

    

    foreach($prices as $key => $entry)
    {
        $prices[$key]["id"] += 1;
    }

    $jsonData["data"]=$prices;

    $newJsonString = json_encode($jsonData, JSON_PRETTY_PRINT);
    file_put_contents("json/dumpPricesReformat.json", $newJsonString);


?>