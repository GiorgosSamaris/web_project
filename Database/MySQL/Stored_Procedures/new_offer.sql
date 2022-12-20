DROP PROCEDURE IF EXISTS new_offer;
DELIMITER $
CREATE PROCEDURE new_offer(IN pro_id SMALLINT, IN sto_id TINYINT, IN cus_id SMALLINT, IN price DECIMAL(3,2))
BEGIN

INSERT INTO `offer`(`product_id`, `store_id`, `customer_id`, `offer_price`) VALUES(pro_id, sto_id, cus_id, price);
DECLARE  gain INT



UPDATE customer SET current_score = current_score + gain WHERE customer_id = cus_id;
END$
DELIMITER ;
