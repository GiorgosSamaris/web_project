-- Creates a new offer and updates customer score

DROP PROCEDURE IF EXISTS new_offer;
DELIMITER $
CREATE PROCEDURE new_offer(IN pro_id SMALLINT UNSIGNED, IN sto_id TINYINT UNSIGNED, IN cus_id SMALLINT UNSIGNED, IN price DECIMAL(3,2))
BEGIN
DECLARE gain INT;
DECLARE avg_price DECIMAL(3,2);

INSERT INTO `offer`(`product_id`, `store_id`, `customer_id`, `offer_price`) VALUES(pro_id, sto_id, cus_id, price);
CALL get_yester_price(pro_id, avg_price);

IF(avg_price*0.8 > price) THEN
    SET gain = 50;
ELSE 
    SET gain = 0;
    CALL get_last_week_price(pro_id, avg_price);
    IF (avg_price*0.8 > price) THEN
        SET gain = 20;
    END IF;
END IF;
UPDATE customer SET current_score = current_score + gain WHERE customer_id = cus_id;
END$
DELIMITER ;
