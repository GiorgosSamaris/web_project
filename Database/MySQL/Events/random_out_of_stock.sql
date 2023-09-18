DROP EVENT IF EXISTS random_out_of_stock;

DELIMITER $
CREATE EVENT random_out_of_stock
ON SCHEDULE EVERY 40 MINUTE
STARTS NOW()
DO 
BEGIN
CALL random_out_of_stock_procedure();
END$

DELIMITER ;
