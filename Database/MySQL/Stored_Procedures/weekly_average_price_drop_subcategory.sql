DROP PROCEDURE IF EXISTS weekly_average_price_drop_subcategory;

DELIMITER $
CREATE PROCEDURE weekly_average_price_drop_subcategory(IN subcat_id VARCHAR(128), IN start_date DATE)
BEGIN
DECLARE done BOOLEAN DEFAULT FALSE;
DECLARE date_iter DATE;
DECLARE current_price_drop DECIMAL(8, 4) DEFAULT 0;
DECLARE current_product_id BIGINT DEFAULT 0;
DECLARE product_cursor CURSOR FOR SELECT product_id FROM product WHERE subcategory_id = subcat_id;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
DROP TABLE IF EXISTS temp_results;
CREATE TABLE temp_results (
    product_id BIGINT UNSIGNED NOT NULL,
    price_drop DECIMAL(5, 4) DEFAULT 0,
    price_date DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


OPEN product_cursor;
    product_loop: LOOP
        FETCH product_cursor INTO current_product_id;
        IF done THEN
            LEAVE product_loop;
        END IF;
        -- iterate from start_date to start_date + 6, calculate average offer price drop %, insert into temp_results
        SET date_iter = start_date;
        WHILE date_iter <= DATE_ADD(start_date, INTERVAL 6 DAY) DO
            SELECT AVG(offer_price) FROM offer WHERE product_id = current_product_id AND DATE(creation_date) = date_iter INTO current_price_drop;
            IF (current_price_drop IS NOT NULL) THEN
                SELECT (average_price - current_price_drop)/average_price FROM price_history WHERE product_id = current_product_id AND price_date = date_iter INTO current_price_drop;
                INSERT INTO temp_results (`product_id`, `price_drop`, `price_date`) VALUES (current_product_id, current_price_drop, date_iter);
            END IF;
            SET date_iter = DATE_ADD(date_iter, INTERVAL 1 DAY);
        END WHILE;
    END LOOP;
    CLOSE product_cursor;
    SELECT AVG(price_drop) as drop_percentage, price_date as drop_date FROM temp_results GROUP BY price_date ORDER BY price_date ASC;
    DROP TABLE temp_results;
END$
DELIMITER ;
