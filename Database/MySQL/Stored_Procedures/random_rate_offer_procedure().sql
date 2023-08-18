DROP PROCEDURE IF EXISTS random_rate_offer_procedure;

DELIMITER $
CREATE PROCEDURE random_rate_offer_procedure()
BEGIN
    DECLARE off_id MEDIUMINT UNSIGNED;
    DECLARE cust_id SMALLINT UNSIGNED;
    -- fetch required values
    SELECT offer_id, author_id FROM offer WHERE active = true ORDER BY RAND() LIMIT 1 INTO off_id, cust_id;
    SELECT customer_id FROM customer WHERE customer_id != cust_id ORDER BY RAND() LIMIT 1 INTO cust_id;
    -- generate a random number in [1, 10], if it's >= 5 then like the offer, else dislike
    IF 5 >= FLOOR( 1 + (RAND() * 10)) THEN
        CALL like_offer(off_id, cust_id);
    ELSE
        CALL dislike_offer(off_id, cust_id);
    END IF;
END$
DELIMITER ;
