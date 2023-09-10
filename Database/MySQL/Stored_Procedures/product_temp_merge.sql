-- SQLBook: Code
DROP PROCEDURE IF EXISTS products_temp_merge;
DELIMITER $
CREATE PROCEDURE products_temp_merge()
BEGIN
    -- handler
    DECLARE done BOOLEAN DEFAULT FALSE;
-- category vars
    DECLARE current_category_id BIGINT DEFAULT 0;
    DECLARE current_category_name VARCHAR(255) DEFAULT '';
    DECLARE old_category_id BIGINT DEFAULT 0;
-- product vars
    DECLARE current_product_name VARCHAR(255) DEFAULT '';
    DECLARE current_product_id BIGINT DEFAULT 0;
    DECLARE current_product_subcategory_id VARCHAR(255) DEFAULT '';
-- subcategory vars
    DECLARE current_subcategory_name VARCHAR(255) DEFAULT '';
    DECLARE current_subcategory_id VARCHAR(255) DEFAULT '';
    DECLARE current_subcategory_category_id VARCHAR(255) DEFAULT '';
-- merge categories
    DECLARE category_cursor CURSOR FOR SELECT category_id, name FROM temp_categories;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN category_cursor;
    category_loop: LOOP
        FETCH category_cursor INTO current_category_id, current_category_name;
        IF done THEN
            LEAVE category_loop;
        END IF;
        IF(EXISTS(SELECT * FROM category WHERE category.name = current_category_name AND category.category_id = current_category_id)) THEN
            -- same name same id already exists on same record, so ignore
            DELETE FROM temp_categories WHERE temp_categories.id = current_category_id;
        ELSEIF(EXISTS(SELECT * FROM category WHERE category.name = current_category_name AND category.category_id != current_category_id)) THEN
            -- same name different id already exists on different record, so update old id
            UPDATE category SET category.category_id = current_category_id WHERE category.name = current_category_name;
        ELSEIF(EXISTS(SELECT * FROM category WHERE category.name != current_category_name AND category.category_id = current_category_id)) THEN
            -- different name same id already exists on different record, so generate new id and insert
            current_category_id =
        END IF;
    END LOOP;
    CLOSE category_cursor;
-- merge subcategories
    DECLARE subcategory_cursor CURSOR FOR SELECT subcategory_id, name, category_id FROM temp_subcategories;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN subcategory_cursor;
    subcategory_loop: LOOP
        FETCH subcategory_cursor INTO current_subcategory_id, current_subcategory_name, current_subcategory_category_id;
        IF done THEN
            LEAVE category_loop;
        END IF;
        IF(EXISTS(SELECT * FROM subcategory WHERE subcategory.name = current_subcategory_name AND subcategory.subcategory_id = current_subcategory_id)) THEN
            -- same name same id already exists on same record, so ignore
            DELETE FROM temp_categories WHERE temp_categories.id = current_subcategory_id;
        ELSEIF(EXISTS(SELECT * FROM subcategory WHERE subcategory.name = current_category_name AND subcategory.subcategory_id != current_subcategory_id)) THEN
            -- same name different id already exists on different record, so update old id
            UPDATE subcategory SET subcategory.subcategory_id = current_subcategory_id WHERE subcategory.name = current_subcategory_name;
        ELSEIF(EXISTS(SELECT * FROM subcategory WHERE subcategory.name != current_category_name AND subcategory.subcategory_id = current_subcategory_id)) THEN
            -- different name same id already exists on different record, so generate new id and insert
            current_category_id =
        END IF;
    END LOOP;
    CLOSE category_cursor;
-- merge products
    DECLARE product_cursor CURSOR FOR SELECT product_id, name, subcategory_id FROM temp_products;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN product_cursor;
    product_loop: LOOP
        FETCH product_cursor INTO current_product_id, current_product_name, current_product_subcategory_id;
        IF done THEN
            LEAVE product_loop;
        END IF;
        IF(EXISTS(SELECT * FROM product WHERE product.name = current_product_name AND product.product_id = current_product_id)) THEN
            -- same name same id already exists on same record, so ignore
            DELETE FROM temp_product WHERE temp_categories.id = current_category_id;
        ELSEIF(EXISTS(SELECT * FROM category WHERE category.name = current_category_name AND category.category_id != current_category_id)) THEN
            -- same name different id already exists on different record, so update old id
            UPDATE category SET category.category_id = current_category_id WHERE category.name = current_category_name;
        ELSEIF(EXISTS(SELECT * FROM category WHERE category.name != current_category_name AND category.category_id = current_category_id)) THEN
            -- different name same id already exists on different record, so generate new id and insert
            current_category_id =
        END IF;
    END LOOP;
    CLOSE category_cursor;
END$ 
DELIMITER ;
