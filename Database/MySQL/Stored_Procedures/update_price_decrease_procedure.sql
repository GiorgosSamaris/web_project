DROP PROCEDURE IF EXISTS update_price_decrease_procedure;

DELIMITER $

CREATE PROCEDURE update_price_decrease_procedure()
BEGIN
DECLARE finished BOOLEAN DEFAULT FALSE;
DECLARE prod_id SMALLINT UNSIGNED;
DECLARE yest_avg_price DECIMAL(10,2);
DECLARE last_week_avg_price DECIMAL(10,2);
DECLARE off_price DECIMAL(10,2);
DECLARE off_id BIGINT UNSIGNED;
DECLARE cur_offer CURSOR FOR SELECT product_id, offer_price, offer_id FROM  offer WHERE active = true;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = TRUE;
    OPEN cur_offer;
-- update flags
    iterate_offers: LOOP
        FETCH cur_offer INTO prod_id, off_price, off_id;
        CALL get_yester_price(prod_id, yest_avg_price);
        CALL get_last_week_price(prod_id, last_week_avg_price);
        IF finished THEN 
            -- no more results
            LEAVE iterate_offers;
        END IF;
        IF (yest_avg_price * 0.8 > off_price) THEN
            UPDATE offer SET price_decrease_last_day_avg = TRUE WHERE offer_id = off_id;
        ELSEIF (last_week_avg_price*0.8 > off_price) THEN
            UPDATE offer SET price_decrease_last_week_avg = TRUE WHERE offer_id = off_id;
        ELSE
            UPDATE offer SET price_decrease_last_day_avg = FALSE, price_decrease_last_week_avg = FALSE WHERE offer_id = off_id;
        END IF;
    END LOOP;
    CLOSE cur_offer;
END$
DELIMITER ;