
DROP SCHEMA IF EXISTS GoCart;
CREATE SCHEMA GoCart;
USE GoCart;

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
  CONSTRAINT `unq_user_email` UNIQUE(username),
  INDEX(username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Customer`
--

CREATE TABLE customer (
  customer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  tokens SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  current_score SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  overall_score SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY  (customer_id),
  CONSTRAINT `unq_customer_username` UNIQUE(email),
  CONSTRAINT `fk_customer_client_id` FOREIGN KEY (customer_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Category`
--

CREATE TABLE category (
  category_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(60) NOT NULL,  
  PRIMARY KEY  (category_id),
  CONSTRAINT `unq_category_name` UNIQUE INDEX(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Subcategory`
--

CREATE TABLE subcategory (
  subcategory_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id TINYINT UNSIGNED NOT NULL,
  name VARCHAR(80) NOT NULL,  
  PRIMARY KEY  (subcategory_id),
  CONSTRAINT `fk_subcategory_category_id)` FOREIGN KEY (category_id) REFERENCES category (category_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  UNIQUE INDEX(name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Product`
--

CREATE TABLE product (
  product_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  subcategory_id TINYINT UNSIGNED NOT NULL,
  name VARCHAR(128) NOT NULL,  
  PRIMARY KEY  (product_id),
  CONSTRAINT `fk_product_subcategory_id` FOREIGN KEY (subcategory_id) REFERENCES subcategory (subcategory_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Price History`
--

CREATE TABLE price_history (
  price_history_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id SMALLINT UNSIGNED NOT NULL,
  price_date DATE NOT NULL,
  average_price DECIMAL(4,2) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY  (price_history_id),
  CONSTRAINT `fk_price_history_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Table structure for table `Store`
--

CREATE TABLE store (
  store_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  store_name VARCHAR(27) NOT NULL DEFAULT 'Unknown',
  longtitude DECIMAL(11,8) NOT NULL,
  latitude DECIMAL(10,8) NOT NULL,
  map_id VARCHAR(16) NOT NULL,
  PRIMARY KEY  (store_id),
  INDEX(store_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Inventory`
--

CREATE TABLE inventory (
  inventory_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  store_id TINYINT UNSIGNED NOT NULL,
  product_id SMALLINT UNSIGNED NOT NULL,
  inventory_price DECIMAL (3,2) NOT NULL DEFAULT 0,
  PRIMARY KEY  (inventory_id),
  CONSTRAINT `fk_inventory_store_id` FOREIGN KEY (store_id) REFERENCES store (store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX (store_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Offer`
--

CREATE TABLE offer (
  offer_id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id SMALLINT UNSIGNED NOT NULL,
  store_id TINYINT UNSIGNED NOT NULL,
  customer_id SMALLINT UNSIGNED NOT NULL,
  offer_price DECIMAL (3,2) NOT NULL DEFAULT 0,
  number_of_likes SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  number_of_dislikes SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  creation_date DATETIME NOT NULL  DEFAULT now(),
  expiration_date DATE NOT NULL DEFAULT (CURRENT_DATE),
  PRIMARY KEY  (offer_id),
  CONSTRAINT `fk_offer_store_id` FOREIGN KEY (store_id) REFERENCES store (store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_offer_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_offer_customer_id` FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  INDEX(customer_id, store_id, product_id, active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




