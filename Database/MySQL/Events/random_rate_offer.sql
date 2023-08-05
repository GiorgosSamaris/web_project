DROP EVENT IF EXISTS random_rate_offer;

-- Randomly rates a random offer
DELIMITER $
CREATE EVENT random_rate_offer
ON SCHEDULE EVERY 1 MINUTE
STARTS NOW()
COMMENT 'Randomly rates a random offer'
DO 
BEGIN
CALL random_offer_procedure();
END$

DELIMITER ;
