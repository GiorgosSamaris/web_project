<?php
    include 'localhostConn.php';
    // include 'azureConn.php';

    // $conn = mysqli_init();
    // mysqli_ssl_set($conn,NULL,NULL, (__DIR__)."/cacert-2023-05-30.pem", NULL, NULL);
    // mysqli_real_connect($conn, "gocart.mysql.database.azure.com", "goCartDevTeam", "softk1ng\$d3v", "gocart", 3306, MYSQLI_CLIENT_SSL);


    //these variables denote if the user added a specific type of entry
    $added_cat = false;
    $added_sub_cat = false;
    $added_prod = false;
    $added_price = false;
    $added_store = false;
    $added_prod_id = false;
    
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

        if(array_key_exists("id", $products[0]))
        {
            $added_prod_id = true;
        }
        //create the csv file and open it for writing
        $csvPath = "/var/lib/mysql-files/products.csv";
        $filePointer = fopen($csvPath, "w");
        

        //write csv header
        if($added_prod_id == true )
        {
            fputs($filePointer, "id| subcategory| name\n"); 
        }
        else
        {
            fputs($filePointer, "subcategory| name\n");

        }
    
        //insert json data to csv
        foreach( $products as $p )
        {
            if($added_prod_id == true)
            {
                fputs($filePointer,($p["id"]."|"));
            }
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
        $csvPath = "/var/lib/mysql-files/prices.csv";
        $filePointer = fopen($csvPath, "w");


        
        //write csv header
        fputs($filePointer, "id,name,date,price\n");
        
        //insert json data to csv
        foreach( $products as $p )
        {
            $prices = $p["prices"];
            foreach($prices as $prcs)
            {
                $added_price = true;
                fputs($filePointer, ($p["id"].","));
                fputcsv($filePointer, $prcs);
            }
        }
        fclose($filePointer);

    }

    if(array_key_exists("features",$jsonData))
    {
        $added_store = true;
        $stores = $jsonData["features"];
        
        //create the csv file and open it for writing
        $csvPath = "/var/lib/mysql-files/stores.csv";
        $filePointer = fopen($csvPath, "w");
        
        
        
        //write csv header
        fputs($filePointer, "store_name,long,lat,map_id, address\n");
        
        //insert json data to csv
        foreach( $stores as $s )
        {
            $s_id = $s["id"];

            if(array_key_exists("name",$s["properties"]))
            {
                $s_name = $s["properties"]["name"];
            }
            else
            {
                $s_name = "Unknown";
            } 
            if(array_key_exists("addr:street",$s["properties"]))
            {
                $s_add = $s["properties"]["addr:street"]." ";

            }
            else
            {
                $s_add = "Unknown";
            }
            if(array_key_exists("addr:housenumber",$s["properties"]))
            {
                $s_add = $s_add.$s["properties"]["addr:housenumber"];

            }
            else 
            {
                $s_add = $s_add."";
            }
            $s_long = $s["geometry"]["coordinates"][0];
            $s_lat = $s["geometry"]["coordinates"][1];
            fputs($filePointer,$s_name.",".$s_long.",".$s_lat.",".$s_id.",".$s_add."\n");
        }
        fclose($filePointer);

    }
    
    echo "Quering database...\n";
    //Declare prepared insert statement

    if($added_cat == true)
    {
        echo "Inserted Categories: \n";
        $statement = 
        "LOAD DATA LOCAL INFILE  '/var/lib/mysql-files/categories.csv'
        INTO TABLE temp_category
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
        echo "Inserted subcategories: \n";
        $statement = 
        "LOAD DATA LOCAL INFILE  '/var/lib/mysql-files/sub_categories.csv'
        INTO TABLE temp_subcategory
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
        if($added_prod_id == true)
        {
            echo "Inserted Products with id: \n";
            $statement = 
            "LOAD DATA LOCAL INFILE '/var/lib/mysql-files/products.csv' 
            INTO TABLE temp_product
            FIELDS TERMINATED BY '|'
            LINES TERMINATED BY '\n'
            IGNORE 1 LINES(product_id, subcategory_id, name)
            ;";
            
            try{
                $cat_insert = $conn->query($statement);
            }
            catch (mysqli_sql_exception $e)
            {
                echo "Error occured during product insert: $e\n";
            }
        }
        else
        {
            echo "Inserted Products without id: \n";
            $statement = 
            "LOAD DATA LOCAL INFILE '/var/lib/mysql-files/products.csv' 
            INTO TABLE temp_product
            FIELDS TERMINATED BY '|'
            LINES TERMINATED BY '\n'
            IGNORE 1 LINES(subcategory_id, name)
            ;";
            
            try{
                $cat_insert = $conn->query($statement);
            }
            catch (mysqli_sql_exception $e)
            {
                echo "Error occured during product insert: $e\n";
            }

        }

    }

    if($added_price == true)
    {
        $statement = 
        "LOAD DATA LOCAL INFILE  '/var/lib/mysql-files/prices.csv' IGNORE
        INTO TABLE temp_price
        FIELDS TERMINATED BY ','
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES(product_id,price_date,average_price);";
    
        try{
            $cat_insert = $conn->query($statement);
        }
        catch (mysqli_sql_exception $e)
        {
            echo "Error occured during price insert: $e\n";
        }

    }
    if($added_store == true)
    {
        $statement = 
        "LOAD DATA LOCAL INFILE  '/var/lib/mysql-files/stores.csv' 
        INTO TABLE temp_store
        FIELDS TERMINATED BY ','
        LINES TERMINATED BY '\n'
        IGNORE 1 LINES(store_name,longitude,latitude,map_id,address);";
    
        try{
            $cat_insert = $conn->query($statement);
        }
        catch (mysqli_sql_exception $e)
        {
            echo "Error occured during store insert: $e\n";
        }

    }

    // //Call store procedures for temp table merge to main
    if($added_prod)
    {
        $statement = "CALL products_temp_merge();";
    
        try{
            $cat_insert = $conn->query($statement);
        }
        catch (mysqli_sql_exception $e)
        {
            echo "Error occured during product insert: $e\n";
        }
    
        if($cat_insert!=1)
            echo "Stored procedure for product insertion failed";
    }



    if($added_price)
    {
        $statement = "CALL products_price_temp_merge();";
    
        try{
            $cat_insert = $conn->query($statement);
        }
        catch (mysqli_sql_exception $e)
        {
            echo "Error occured during price insert: $e\n";
        }
    
        if($cat_insert!=1)
            echo "Stored procedure for price insertion failed";
    }

    if($added_store)
    {
        $statement = "CALL store_temp_merge();";

        try{
            $cat_insert = $conn->query($statement);
            if($cat_insert!=1)
            echo "Stored procedure for store insertion failed";
        }
        catch (mysqli_sql_exception $e)
        {
            echo "Error occured during store insert: $e\n";
        }

        

    }

    ?>