DROP EVENT IF EXISTS renew_or_expire_offers;


DELIMITER $
CREATE EVENT renew_or_expire_offers
ON SCHEDULE EVERY 1 DAY 
STARTS '2023-07-24 00:05:00'
COMMENT ''
DO 
BEGIN
CALL renew_or_expire_offers_procedure();
END$

DELIMITER ;
