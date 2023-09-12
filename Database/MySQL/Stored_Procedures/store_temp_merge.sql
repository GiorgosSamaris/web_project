DROP PROCEDURE IF EXISTS store_temp_merge;
DROP PROCEDURE IF EXISTS products_price_temp_merge;
DELIMITER $
CREATE PROCEDURE products_price_temp_merge()
BEGIN
    -- handler
    DECLARE done BOOLEAN DEFAULT FALSE;
    -- vars
    DECLARE current_store_name VARCHAR(27) NOT NULL DEFAULT 'Unknown',
    DECLARE current_longitude DECIMAL(11,8) NOT NULL,
    DECLARE current_latitude DECIMAL(10,8) NOT NULL,
    DECLARE current_map_id VARCHAR(16) NOT NULL,
    address VARCHAR(40) NOT NULL DEFAULT 'Unknown',
    DECLARE store_cursor CURSOR FOR SELECT product_id, price_date, average_price FROM temp_price;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN store_cursor;
    store_loop: LOOP
        FETCH store_cursor INTO current_product_id, current_price_date, average_price;
        IF done THEN
            LEAVE store_loop;
        END IF;
        IF (EXISTS(SELECT * FROM store WHERE map_id = current_map_id )) THEN
            -- entry with same id already exists so update
            UPDATE store SET store_name = current_store_name, longitude = current_longitude, latitude = current_latitude, address = current_address WHERE map_id = current_map_id;
        ELSE 
            -- insert new
            INSERT INTO store (`store_name`, `longitude`, `latitude`, `map_id`, `address`) VALUES (current_store_name, current_longitude, current_latitude, current_map_id, current_address);
        END IF;
    END LOOP;
    CLOSE store_cursor;
    DELETE FROM temp_store;
END$
DELIMITER ;
