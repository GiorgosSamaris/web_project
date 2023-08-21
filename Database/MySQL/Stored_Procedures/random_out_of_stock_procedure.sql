DROP PROCEDURE IF EXISTS random_out_of_stock_procedure;

DELIMITER $
CREATE PROCEDURE random_out_of_stock_procedure()
BEGIN
    DECLARE off_id MEDIUMINT UNSIGNED;
    -- fetch required value
    SELECT offer_id FROM offer WHERE active = true AND in_stock = true ORDER BY RAND() LIMIT 1 INTO off_id;
    UPDATE offer SET in_stock = false WHERE offer_id = off_id;
END$
DELIMITER ;
