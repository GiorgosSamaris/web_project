DROP PROCEDURE IF EXISTS new_offer;
DELIMITER $

CREATE PROCEDURE new_offer(IN pro_id SMALLINT UNSIGNED, IN sto_id TINYINT UNSIGNED, IN cus_id SMALLINT UNSIGNED, IN price DECIMAL(4,2))
BEGIN
    DECLARE gain INT;
    DECLARE avg_price DECIMAL(4,2);
    SET gain = 0;

    -- existing active offer on the same product on the same store, but 20% cheaper 
    IF EXISTS (
        SELECT *
        FROM offer
        WHERE product_id = pro_id
        AND store_id = sto_id
        AND active = true
        ORDER BY offer_price ASC
        LIMIT 1
    )
    AND price <= 0.8 * (
        SELECT offer_price
        FROM offer
        WHERE product_id = pro_id
        AND store_id = sto_id
        AND active = true
        ORDER BY offer_price ASC
        LIMIT 1
    ) THEN
        -- create new offer
        INSERT INTO `offer`(`product_id`, `store_id`, `author_id`, `offer_price`) VALUES(pro_id, sto_id, cus_id, price);
        UPDATE offer SET expiration_date = DATE_ADD(expiration_date, INTERVAL 7 DAY) WHERE offer_id = LAST_INSERT_ID();
        CALL get_yester_price(pro_id, avg_price);
        SET gain = 0;
        IF avg_price * 0.8 > price THEN
            SET gain = 50;
        ELSE 
            CALL get_last_week_price(pro_id, avg_price);
            IF avg_price * 0.8 > price THEN
                SET gain = 20;
            END IF;
        END IF;

    -- No active offer on same store and product
    ELSEIF NOT EXISTS (
        SELECT *
        FROM offer
        WHERE product_id = pro_id
        AND store_id = sto_id
        AND active = true
        ORDER BY offer_price ASC
        LIMIT 1
    ) THEN
        -- create new offer as above
        INSERT INTO `offer`(`product_id`, `store_id`, `author_id`, `offer_price`) VALUES(pro_id, sto_id, cus_id, price);
        UPDATE offer SET expiration_date = DATE_ADD(expiration_date, INTERVAL 7 DAY) WHERE offer_id = LAST_INSERT_ID();
        CALL get_yester_price(pro_id, avg_price);
        SET gain = 0;
        IF avg_price * 0.8 > price THEN
            SET gain = 50;
        ELSE 
            CALL get_last_week_price(pro_id, avg_price);
            IF avg_price * 0.8 > price THEN
                SET gain = 20;
            END IF;
        END IF;
    END IF;

    -- finally update customer score
    UPDATE customer SET current_score = current_score + gain, overall_score = overall_score + gain WHERE customer_id = cus_id;
END$

DELIMITER ;
