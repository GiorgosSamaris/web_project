DROP PROCEDURE IF EXISTS products_temp_merge;
DELIMITER $
CREATE PROCEDURE products_temp_merge()
BEGIN
    -- handler
    DECLARE done BOOLEAN DEFAULT FALSE;
    -- category vars
    DECLARE current_category_id VARCHAR(255) DEFAULT '';
    DECLARE current_category_name VARCHAR(255) DEFAULT '';
    DECLARE old_category_id VARCHAR(255) DEFAULT '';
    -- product vars
    DECLARE current_product_name VARCHAR(255) DEFAULT '';
    DECLARE current_product_id BIGINT DEFAULT 0;
    DECLARE current_product_subcategory_id VARCHAR(255) DEFAULT '';
    DECLARE old_subcategory_id VARCHAR(255) DEFAULT '';
    DECLARE old_product_id BIGINT DEFAULT 0;

    -- subcategory vars
    DECLARE current_subcategory_name VARCHAR(255) DEFAULT '';
    DECLARE current_subcategory_id VARCHAR(255) DEFAULT '';
    DECLARE current_subcategory_category_id VARCHAR(255) DEFAULT '';
    -- merge categories
    DECLARE category_cursor CURSOR FOR SELECT category_id, name FROM temp_category;
    DECLARE subcategory_cursor CURSOR FOR SELECT subcategory_id, name, category_id FROM temp_subcategory;
    DECLARE product_cursor CURSOR FOR SELECT product_id, name, subcategory_id FROM temp_product;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN category_cursor;
    category_loop: LOOP
        FETCH category_cursor INTO current_category_id, current_category_name;
        IF done THEN
            LEAVE category_loop;
        END IF;
        IF (EXISTS(SELECT * FROM category WHERE category.name = current_category_name AND category.category_id = current_category_id)) THEN
            -- same name same id already exists on the same record, so ignore
            DELETE FROM temp_category WHERE temp_category.category_id = current_category_id;
        ELSEIF (EXISTS(SELECT * FROM category WHERE category.name = current_category_name AND category.category_id != current_category_id)) THEN
            -- same name different id already exists on a different record, so update the old id
            UPDATE category SET category.category_id = current_category_id WHERE category.name = current_category_name;
        ELSEIF (EXISTS(SELECT * FROM category WHERE category.name != current_category_name AND category.category_id = current_category_id)) THEN
            -- different name same id already exists on a different record, so generate a new id and insert
            SELECT category_id FROM category WHERE category.name != current_category_name AND category.category_id = current_category_id INTO old_category_id;
            SET current_category_id = SUBSTR(MD5(RAND()), 1, 32);
            UPDATE temp_subcategory SET temp_subcategory.category_id = current_category_id WHERE temp_subcategory.category_id = old_category_id;
            INSERT INTO category (`name`, `category_id`) VALUES (current_category_name, current_category_id);
        ELSE
            -- insert new
            INSERT INTO category (`name`, `category_id`) VALUES (current_category_name, current_category_id);
        END IF;
    END LOOP;
    CLOSE category_cursor;
    DELETE FROM temp_category;
    SET done = FALSE;
    -- merge subcategories
    OPEN subcategory_cursor;
    subcategory_loop: LOOP
        FETCH subcategory_cursor INTO current_subcategory_id, current_subcategory_name, current_subcategory_category_id;
        IF done THEN
            LEAVE subcategory_loop;
        END IF;
        IF (EXISTS(SELECT * FROM subcategory WHERE subcategory.name = current_subcategory_name AND subcategory.subcategory_id = current_subcategory_id)) THEN
            -- same name same id already exists on the same record, so ignore
            DELETE FROM temp_subcategory WHERE temp_subcategory.subcategory_id = current_subcategory_id;
        ELSEIF (EXISTS(SELECT * FROM subcategory WHERE subcategory.name = current_subcategory_name AND subcategory.subcategory_id != current_subcategory_id)) THEN
            -- same name different id already exists on a different record, so update the old id
            UPDATE subcategory SET subcategory.subcategory_id = current_subcategory_id WHERE subcategory.name = current_subcategory_name;
        ELSEIF (EXISTS(SELECT * FROM subcategory WHERE subcategory.name != current_subcategory_name AND subcategory.subcategory_id = current_subcategory_id)) THEN
            -- different name same id already exists on a different record, so generate a new id and insert
            SELECT subcategory_id FROM subcategory WHERE subcategory.name != current_subcategory_name AND subcategory.subcategory_id = current_subcategory_id INTO old_subcategory_id;
            UPDATE temp_product SET temp_product.subcategory_id = current_subcategory_id WHERE temp_product.subcategory_id = old_subcategory_id;
            SET current_subcategory_id =  SUBSTR(MD5(RAND()), 1, 32);
            INSERT INTO subcategory (`name`, `category_id`, `subcategory_id`) VALUES (current_subcategory_name, current_subcategory_category_id, current_subcategory_id);
        ELSE
            -- insert new
            INSERT INTO subcategory (`name`, `category_id`, `subcategory_id`) VALUES (current_subcategory_name, current_subcategory_category_id, current_subcategory_id);
        END IF;
    END LOOP;
    CLOSE subcategory_cursor;
    DELETE FROM temp_subcategory;
    SET done = FALSE;
    -- merge products
    OPEN product_cursor;
    product_loop: LOOP
        FETCH product_cursor INTO current_product_id, current_product_name, current_product_subcategory_id;
        IF done THEN
            LEAVE product_loop;
        END IF;
        IF (EXISTS(SELECT * FROM product WHERE product.name = current_product_name AND product.product_id = current_product_id)) THEN
            -- same name same id already exists on the same record, so ignore
            DELETE FROM temp_product WHERE temp_product.product_id = current_product_id;
        ELSEIF (EXISTS(SELECT * FROM product WHERE product.name = current_product_name AND product.product_id != current_product_id)) THEN
            -- same name different id already exists on a different record, so keep the old id
            SELECT product_id FROM product WHERE product.name = current_product_name AND product.product_id != current_product_id INTO old_product_id;
            UPDATE temp_price SET product_id =  old_product_id WHERE product_id = current_product_id; 
        ELSEIF (EXISTS(SELECT * FROM product WHERE product.name != current_product_name AND product.product_id = current_product_id)) THEN
            -- different name same id already exists on a different record, so generate a new id and insert
            INSERT INTO product (`name`, `subcategory_id`) VALUES (current_product_name, current_product_subcategory_id);
            UPDATE temp_price SET product_id =  LAST_INSERT_ID() WHERE product_id = current_product_id;
        ELSE
            -- insert new
            INSERT INTO product (`name`, `subcategory_id`) VALUES (current_product_name, current_product_subcategory_id);
        END IF;
    END LOOP;
    CLOSE product_cursor;
    DELETE FROM temp_product;
END$
DELIMITER ;
