DROP PROCEDURE IF EXISTS products_price_temp_merge;
DELIMITER $
CREATE PROCEDURE products_price_temp_merge()
BEGIN
    -- handler
    DECLARE done BOOLEAN DEFAULT FALSE;
    -- vars
    DECLARE current_product_id BIGINT DEFAULT 0;
    DECLARE current_price_date DATE NOT NULL,
    DECLARE average_price DECIMAL(4,2) UNSIGNED NOT NULL DEFAULT 0,
    DECLARE price_cursor CURSOR FOR SELECT product_id, price_date, average_price FROM temp_price;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN price_cursor;
    price_loop: LOOP
        FETCH price_cursor INTO current_product_id, current_price_date, average_price;
        IF done THEN
            LEAVE price_loop;
        END IF;
        IF (EXISTS(SELECT * FROM price_history WHERE product_id = current_product_id AND price_date = current_price_date)) THEN
            -- entry with same id already exists on same date, so update
            UPDATE price_history SET average_price = average_price WHERE product_id = current_product_id AND price_date = current_price_date;
        ELSE 
            -- insert new
            INSERT INTO price_history (`product_id`, `price_date`, `average_price`) VALUES (current_product_id, current_price_date, average_price);
        END IF;
    END LOOP;
    CLOSE price_cursor;
    DELETE FROM temp_price;
END$
DELIMITER ;
