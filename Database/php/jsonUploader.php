<?php
    include 'localhostConn.php';
    // include 'azureConn.php'
    

    //these variables denote if the user added a specific type of entry
    $added_cat = false;
    $added_sub_cat = false;
    $added_prod = false;
    
    
    echo "Converting...\n";
    $jsonPath = $argv[1];
    $jsonString = file_get_contents($jsonPath);
    
    //convert json to an assosiative array
    $jsonData = json_decode($jsonString, true);
    
    //check what type of keys exits in the assosiative array
    if(array_key_exists("products", $jsonData))
    {
        $products = $jsonData["products"];

        $added_prod = true;
        
        //create the csv file and open it for writing
        $csvPath = "/var/lib/mysql-files/products.csv";
        $filePointer = fopen($csvPath, "w");
        
        //write csv header
        fputs($filePointer, "subcategory| name\n");
    
        //insert json data to csv
        foreach( $products as $p )
        {
            
            fputs($filePointer,($p["subcategory"]."|".$p["name"]."\n"));
            
        }
        fclose($filePointer);
        
    }
    if(array_key_exists("categories", $jsonData))
    {
        $categories = $jsonData["categories"];
    
        //create the csv file and open it for writing
        $csvPathCat = "/var/lib/mysql-files/categories.csv";
        $csvPathSubCat = "/var/lib/mysql-files/sub_categories.csv";
        $filePointerCat = fopen($csvPathCat, "w");
        $filePointerSubCat = fopen($csvPathSubCat, "w");
    
        //write csv header
        fputs($filePointerCat, "category_id|category_name\n");
        fputs($filePointerSubCat, "subcategory_id|category_id|subcategory_name\n");
        
        //insert json data to csv
        foreach( $categories as $c )
        {
            $added_cat = true;
            fputs($filePointerCat, ($c["id"]."|".$c["name"]."\n"));
            //check if the category has a subcategory
            
            $subcategories = $c["subcategories"];
            foreach($subcategories as $s)
            {
                $added_sub_cat = true;
                fputs($filePointerSubCat, ($s["uuid"]."|"));
                fputs($filePointerSubCat, ($c["id"]."|".$s["name"]."\n"));    
            }
            
            
        }
        fclose($filePointerCat);
        fclose($filePointerSubCat);

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
    
    echo "Quering database...\n";
    //Declare prepared insert statement

    if($added_cat == true)
    {
        $statement = 
        "LOAD DATA INFILE  '/var/lib/mysql-files/categories.csv'
        INTO TABLE category
        FIELDS TERMINATED BY '|'
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;";
    
    
        
        try{
            $cat_insert = $conn->query($statement);
        }
        catch (mysqli_sql_exception $e)
        {
            echo "Error occured during category insert: $e\n";
        }

    }
    if($added_sub_cat == true)
    {
        $statement = 
        "LOAD DATA INFILE  '/var/lib/mysql-files/sub_categories.csv'
        INTO TABLE subcategory
        FIELDS TERMINATED BY '|'
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;";
    
        try{
            $cat_insert = $conn->query($statement);
        }
        catch (mysqli_sql_exception $e)
        {
            echo "Error occured during subcategory insert: $e\n";
        }

    }

    if($added_prod == true)
    {
        $statement = 
        "LOAD DATA INFILE  '/var/lib/mysql-files/products.csv'
        INTO TABLE temp_table
        FIELDS TERMINATED BY '|'
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES;";
    
        try{
            $cat_insert = $conn->query($statement);
        }
        catch (mysqli_sql_exception $e)
        {
            echo "Error occured during product insert: $e\n";
        }

    }


    

    ?>