DROP PROCEDURE IF EXISTS store_temp_merge;
DELIMITER $
CREATE PROCEDURE store_temp_merge()
BEGIN
    -- handler
    DECLARE done BOOLEAN DEFAULT FALSE;
    -- vars
    DECLARE current_store_name VARCHAR(27) DEFAULT 'Unknown';
    DECLARE current_longitude DECIMAL(11,8);
    DECLARE current_latitude DECIMAL(10,8);
    DECLARE current_map_id VARCHAR(16);
    DECLARE current_address VARCHAR(40) DEFAULT 'Unknown';
    DECLARE store_cursor CURSOR FOR SELECT store_name, longitude, latitude, map_id, address FROM temp_store;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN store_cursor;
    store_loop: LOOP
        FETCH store_cursor INTO current_store_name, current_longitude, current_latitude, current_map_id, current_address;
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
