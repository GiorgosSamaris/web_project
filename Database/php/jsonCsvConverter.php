<?php

    echo "Converting...";
    $jsonPath = $argv[1];
    $jsonString = file_get_contents($jsonPath);

    //convert json to an assosiative array
    $jsonData = json_decode($jsonString, true);
    
    //check what type of keys exits in the assosiative array
    if(array_key_exists("products", $jsonData))
    {
        $products = $jsonData["products"];
    
        //create the csv file and open it for writing
        $csvPath = "products.csv";
        $filePointer = fopen($csvPath, "w");
    
        //write csv header
        fputs($filePointer, "id,name,category,subcategory\n");
    
        //insert json data to csv
        foreach( $products as $p )
        {
            fputcsv($filePointer, $p);
        }
        fclose($filePointer);

    }
    if(array_key_exists("categories", $jsonData))
    {
        $categories = $jsonData["categories"];
    
        //create the csv file and open it for writing
        $csvPath = "categories.csv";
        $filePointer = fopen($csvPath, "w");
    
        //write csv header
        fputs($filePointer, "category_id,category_name,subcategory_id,subcategory_name\n");
    
        //insert json data to csv
        foreach( $categories as $c )
        {

            //check if the category has a subcategory
            if(array_key_exists("subcategories", $c));
            {
                $subcategories = $c["subcategories"];
                foreach($subcategories as $s)
                {
                    fputs($filePointer, ($c["id"].",".$c["name"].","));
                    fputcsv($filePointer, $s);
                    
                }

            }
        }
        fclose($filePointer);

    }

    if(array_key_exists("data",$jsonData))
    {
        $products = $jsonData["data"];
    
        //create the csv file and open it for writing
        $csvPath = "prices.csv";
        $filePointer = fopen($csvPath, "w");
    
        //write csv header
        fputs($filePointer, "id,name,date,price\n");
    
        //insert json data to csv
        foreach( $products as $p )
        {
            $prices = $p["prices"];
            foreach($prices as $prcs)
            {
                fputs($filePointer, ($p["id"].",".$p["name"].","));
                fputcsv($filePointer, $prcs);
            }
        }
        fclose($filePointer);

    }

?>