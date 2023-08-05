DROP EVENT IF EXISTS random_offer;

-- Chooses a random customer to create an offer on a random product of a random store
DELIMITER $
CREATE EVENT random_offer
ON SCHEDULE EVERY 10 MINUTE
STARTS NOW()
COMMENT 'Chooses a random customer to create an offer on a random product of a random store'
DO 
BEGIN
CALL random_offer_procedure();
END$

DELIMITER ;
