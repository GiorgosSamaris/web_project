DROP PROCEDURE IF EXISTS like_dislike_history;
DELIMITER $
CREATE PROCEDURE like_dislike_history(IN id SMALLINT UNSIGNED)
BEGIN
    SELECT o.offer_id, p.name, u.username, c.overall_score, p.product_id, o.offer_price, o.number_of_likes, o.number_of_dislikes, o.in_stock, o.creation_date,o.price_decrease_last_day_avg, o.price_decrease_last_week_avg, o.store_id
                                    from offer as o INNER JOIN product as p ON p.product_id = o.product_id
                                    INNER JOIN customer as c ON c.customer_id = o.author_id
                                    INNER JOIN user as u ON c.customer_id = u.user_id
                                    INNER JOIN offer_rating as r ON r.offer_id = o.offer_id
                                    WHERE r.customer_id = id ORDER BY rating_date DESC;
END$
DELIMITER ;