
  DROP SCHEMA IF EXISTS gocart;
  CREATE SCHEMA gocart;
  USE gocart;

  --
  -- Table structure for table `User`
  --

  CREATE TABLE user (
    user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    isAdmin BOOLEAN DEFAULT FALSE,
    register_date DATETIME DEFAULT now(),
    PRIMARY KEY  (user_id),
    CONSTRAINT `unq_user_name` UNIQUE(username),
    INDEX(username)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Table structure for table `Customer`
  --

  CREATE TABLE customer (
    customer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(45) NOT NULL,
    overall_tokens INT UNSIGNED NOT NULL DEFAULT 0,
    last_months_tokens INT UNSIGNED NOT NULL DEFAULT 0,
    current_score SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    overall_score SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY  (customer_id),
    CONSTRAINT `unq_customer_email` UNIQUE(email),
    CONSTRAINT `fk_customer_client_id` FOREIGN KEY (customer_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX(email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Table structure for table `Category`
  --

  CREATE TABLE category (
    category_id VARCHAR(32) NOT NULL,
    name VARCHAR(60) NOT NULL,  
    PRIMARY KEY  (category_id),
    CONSTRAINT `unq_category_name` UNIQUE INDEX(name)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Table structure for table `Subcategory`
  --

  CREATE TABLE subcategory (
    subcategory_id VARCHAR(32) NOT NULL,
    category_id VARCHAR(32) NOT NULL,
    name VARCHAR(80) NOT NULL,  
    PRIMARY KEY  (subcategory_id),
    CONSTRAINT `fk_subcategory_category_id` FOREIGN KEY (category_id) REFERENCES category (category_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `unq_subcategory_id` UNIQUE INDEX(subcategory_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Table structure for table `Product`
  --


  CREATE TABLE product (
    product_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    subcategory_id VARCHAR(32) NOT NULL,
    name VARCHAR(128) NOT NULL,  
    PRIMARY KEY  (product_id),
    CONSTRAINT `fk_product_subcategory_id` FOREIGN KEY (subcategory_id) REFERENCES subcategory (subcategory_id) ON DELETE RESTRICT ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Table structure for table `Price History`
  --

  CREATE TABLE price_history (
    price_history_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id MEDIUMINT UNSIGNED NOT NULL,
    price_date DATE NOT NULL,
    average_price DECIMAL(4,2) UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY  (price_history_id),
    INDEX(product_id, price_date),
    CONSTRAINT `fk_price_history_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



  --
  -- Table structure for table `Store`
  --

  CREATE TABLE store (
    store_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
    store_name VARCHAR(27) NOT NULL DEFAULT 'Unknown',
    longitude DECIMAL(11,8) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    map_id VARCHAR(16) NOT NULL,
    address VARCHAR(40) NOT NULL DEFAULT 'Unknown',
    PRIMARY KEY  (store_id),
    INDEX(store_name)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Table structure for table `Inventory`
  --

  CREATE TABLE inventory (
    inventory_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    store_id TINYINT UNSIGNED NOT NULL,
    product_id MEDIUMINT UNSIGNED NOT NULL,
    inventory_price DECIMAL (4,2) NOT NULL DEFAULT 0,
    PRIMARY KEY  (inventory_id),
    CONSTRAINT `fk_inventory_store_id` FOREIGN KEY (store_id) REFERENCES store (store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_inventory_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX (store_id,product_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Table structure for table `Offer`
  --
  CREATE TABLE offer (
    offer_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    product_id MEDIUMINT UNSIGNED NOT NULL,
    store_id TINYINT UNSIGNED NOT NULL,
    author_id SMALLINT UNSIGNED NOT NULL,
    offer_price DECIMAL (4,2) NOT NULL DEFAULT 0,
    number_of_likes SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    number_of_dislikes SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    creation_date DATETIME NOT NULL  DEFAULT now(),
    expiration_date DATE NOT NULL DEFAULT (CURRENT_DATE),
    price_decrease_last_day_avg BOOLEAN NOT NULL DEFAULT FALSE,
    price_decrease_last_week_avg BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY  (offer_id),
    CONSTRAINT `fk_offer_store_id` FOREIGN KEY (store_id) REFERENCES store (store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_offer_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_offer_customer_id` FOREIGN KEY (author_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX(author_id, store_id, product_id, active)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  --
  -- Table structure for table `offer_rating`
  --

  CREATE TABLE offer_rating (
    rating_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    offer_id BIGINT UNSIGNED NOT NULL,
    customer_id SMALLINT UNSIGNED NOT NULL,
    rate_value ENUM('LIKE', 'DISLIKE') NOT NULL,
    rating_date DATETIME NOT NULL  DEFAULT now(),
    PRIMARY KEY  (rating_id),
    CONSTRAINT `fk_offer_rate_id` FOREIGN KEY (offer_id) REFERENCES offer (offer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk_rate_customer_id` FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX(customer_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  CREATE TABLE temp_category (
    category_id VARCHAR(32) NOT NULL,
    name VARCHAR(60) NOT NULL  
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  CREATE TABLE temp_subcategory (
    subcategory_id VARCHAR(32) NOT NULL,
    category_id VARCHAR(32) NOT NULL,
    name VARCHAR(80) NOT NULL  
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  CREATE TABLE temp_product (
    product_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    subcategory_id VARCHAR(32) NOT NULL,
    name VARCHAR(128) NOT NULL  
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

    CREATE TABLE temp_price (
    product_id MEDIUMINT UNSIGNED NOT NULL,
    price_date DATE NOT NULL,
    average_price DECIMAL(4,2) UNSIGNED NOT NULL DEFAULT 0
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


  CREATE TABLE temp_store (
    store_name VARCHAR(27) NOT NULL DEFAULT 'Unknown',
    longitude DECIMAL(11,8) NOT NULL,
    latitude DECIMAL(10,8) NOT NULL,
    map_id VARCHAR(16) NOT NULL,
    address VARCHAR(40) NOT NULL DEFAULT 'Unknown'
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

