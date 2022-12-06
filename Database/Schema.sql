
DROP SCHEMA IF EXISTS tbdProject;
CREATE SCHEMA tbdProject;
USE tbdProject;

--
-- Table structure for table `User`
--

CREATE TABLE user (
  user_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  PRIMARY KEY  (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Customer`
--

CREATE TABLE customer (
  customer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  tokens SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  current_score SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  overall_score SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY  (customer_id),
  CONSTRAINT `fk_customer_client_id` FOREIGN KEY (customer_id) REFERENCES user (user_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Category`
--

CREATE TABLE category (
  category_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL DEFAULT 'Uknown',  
  PRIMARY KEY  (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Subcategory`
--

CREATE TABLE subcategory (
  subcategory_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category_id TINYINT UNSIGNED NOT NULL,
  name VARCHAR(45) NOT NULL DEFAULT 'Uknown',  
  PRIMARY KEY  (subcategory_id),
  CONSTRAINT `fk_subcategory_category_id)` FOREIGN KEY (category_id) REFERENCES category (category_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Product`
--

CREATE TABLE product (
  product_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  subcategory_id TINYINT UNSIGNED NOT NULL,
  name VARCHAR(128) NOT NULL DEFAULT 'Uknown',  
  PRIMARY KEY  (product_id),
  CONSTRAINT `fk_product_subcategory_id` FOREIGN KEY (subcategory_id) REFERENCES subcategory (subcategory_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Price History`
--

CREATE TABLE price_history (
  price_history_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id SMALLINT UNSIGNED NOT NULL,
  date DATETIME NOT NULL DEFAULT now(),
  average_price DECIMAL(3,2) NOT NULL DEFAULT 0,
  PRIMARY KEY  (price_history_id),
  CONSTRAINT `fk_price_history_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



--
-- Table structure for table `Store Group`
--

CREATE TABLE store_group (
  store_group_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  group_name VARCHAR(45) NOT NULL DEFAULT 'Uknown',
  number_of_stores SMALLINT UNSIGNED NOT NULL DEFAULT 0,    
  PRIMARY KEY  (store_group_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




--
-- Table structure for table `Store`
--

CREATE TABLE store (
  store_id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  store_group_id TINYINT UNSIGNED NOT NULL,
  store_name VARCHAR(45) NOT NULL DEFAULT 'Uknown',
  longitude DECIMAL(5,3) NOT NULL,
  latitude DECIMAL(5,3) NOT NULL,
  PRIMARY KEY  (store_id),
  CONSTRAINT `fk_store_store_grup_id` FOREIGN KEY (store_group_id) REFERENCES store_group (store_group_id) ON DELETE RESTRICT ON UPDATE CASCADE
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
  CONSTRAINT `fk_inventory_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Offer`
--

CREATE TABLE offer (
  offer_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id SMALLINT UNSIGNED NOT NULL,
  store_id TINYINT UNSIGNED NOT NULL,
  customer_id SMALLINT UNSIGNED NOT NULL,
  offer_price DECIMAL (3,2) NOT NULL DEFAULT 0,
  number_of_likes SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  number_of_dislikes SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  in_stock BOOLEAN NOT NULL DEFAULT TRUE,
  creation_date DATETIME NOT NULL  DEFAULT now(),
  expiration_date DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY  (offer_id),
  CONSTRAINT `fk_offer_store_id` FOREIGN KEY (store_id) REFERENCES store (store_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_offer_product_id` FOREIGN KEY (product_id) REFERENCES product (product_id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_offer_customer_id` FOREIGN KEY (customer_id) REFERENCES customer (customer_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `Offer History`
--

CREATE TABLE offer_history (
  offer_history_id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
  offer_id SMALLINT UNSIGNED NOT NULL,
  PRIMARY KEY  (offer_history_id),
  CONSTRAINT `fk_offer_history_offer_id` FOREIGN KEY (offer_id) REFERENCES offer (offer_id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

