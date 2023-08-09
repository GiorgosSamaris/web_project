-- Returns last week's average price for a given product_id
-- 

DROP PROCEDURE IF EXISTS get_last_week_price;
DELIMITER $
CREATE PROCEDURE get_last_week_price(IN pro_id SMALLINT UNSIGNED, OUT price DECIMAL(4,2))
BEGIN
DECLARE incr INT;
DECLARE denominator INT;
DECLARE dayily_average DECIMAL(4,2);
SET incr = 0;
SET denominator = 0;
SET price = 0;
day_loop: LOOP
    SET incr = incr + 1;
    SET dayily_average = NULL;
    SELECT average_price FROM price_history WHERE product_id = pro_id AND price_date = DATE_SUB(CURDATE(), INTERVAL incr DAY) LIMIT 1 INTO dayily_average ;
    IF dayily_average IS NOT NULL THEN
        SET denominator = denominator + 1;
        SET price = ROUND((price + dayily_average), 2);
    END IF;
    IF incr < 7 THEN 
        ITERATE day_loop;
    END IF;
    LEAVE day_loop;
END LOOP day_loop;
IF denominator > 0 THEN
    SET price = ROUND((price / denominator), 2);
END IF;
END$
DELIMITER ;
