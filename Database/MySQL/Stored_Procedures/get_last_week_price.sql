-- Returns last week's average price for a given product_id
-- 

DROP PROCEDURE IF EXISTS get_last_week_price;
DELIMITER $
CREATE PROCEDURE get_last_week_price(IN pro_id SMALLINT, OUT price DECIMAL(3,2))
BEGIN
DECLARE incr INT;
DECLARE denominator INT;
DECLARE dayily_average DECIMAL(3,2);
SET incr = 0;
SET denominator = 0;
SET price = 0;
day_loop: LOOP
    SET incr = incr + 1;
    SET dayily_average = NULL;
    SELECT average_price INTO dayily_average FROM price_history WHERE product_id = pro_id AND price_date = DATE_SUB(CURDATE(), INTERVAL incr DAY);
    IF dayily_average IS NOT NULL THEN
        SET denominator = denominator + 1;
        SET price = price + dayily_average;
    END IF;
    IF incr < 7 THEN 
        ITERATE day_loop;
    END IF;
    LEAVE day_loop;
END LOOP day_loop;
SELECT price;
SELECT denominator;
SET price = price / denominator;
END$
DELIMITER ;
