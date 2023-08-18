DROP PROCEDURE IF EXISTS renew_or_expire_offers_procedure;
DELIMITER $
CREATE PROCEDURE renew_or_expire_offers_procedure()
BEGIN
    DECLARE finished BOOLEAN DEFAULT FALSE;
    DECLARE off_id MEDIUMINT UNSIGNED;
    DECLARE exp_date DATE;
    DECLARE prod_id SMALLINT UNSIGNED;
    DECLARE off_price DECIMAL(4,2);
    DECLARE yest_avg_price DECIMAL(4,2);
    DECLARE last_week_avg_price DECIMAL(4,2);
    DECLARE expired_offers CURSOR FOR SELECT expiration_date, offer_id, product_id, offer_price FROM  offer WHERE expiration_date < NOW();
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET finished = TRUE;
    OPEN expired_offers;
-- renew expiration
    iterate_expired_offers: LOOP
        FETCH expired_offers INTO exp_date, off_id, prod_id, off_price;
        CALL get_yester_price(prod_id, yest_avg_price);
        CALL get_last_week_price(prod_id, last_week_avg_price);
        IF finished THEN 
            -- no more results
            LEAVE iterate_expired_offers;
        END IF;
        IF (yest_avg_price * 0.8 > off_price) OR (last_week_avg_price * 0.8 > off_price) THEN
            UPDATE offer SET expiration_date = DATE_ADD(expiration_date, INTERVAL 7 DAY) WHERE offer_id = off_id;
        END IF;
    END LOOP;
    CLOSE expired_offers;
    -- set expired to not active
    UPDATE offer SET active = false WHERE expiration_date < NOW();
END$
DELIMITER ;
