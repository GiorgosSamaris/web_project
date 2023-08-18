import csv
import random
with open('inventory.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["store_id", "product_id"])
    for store_id in range(1, 90):
        productsList = []
        for products in range(random.randint(120, 600)):
            product_id = random.randint(1, 1232)
            if product_id not in productsList:
                productsList.append(product_id)
        for product_id in productsList:
            writer.writerow([store_id, product_id])
# MYSQL insert query: LOAD DATA INFILE 'path' INTO TABLE inventory FIELDS TERMINATED BY ','  LINES TERMINATED BY '\r\n' IGNORE 1 ROWS (store_id, product_id);
