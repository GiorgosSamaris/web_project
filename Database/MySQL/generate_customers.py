from random_username.generate import generate_username
# https://github.com/williexu/random_username
import csv
usernames = generate_username(1000)
usernames = [*set(usernames)]
with open('users.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["username", "password"])
    for username in usernames:
        writer.writerow([username, "password"])
with open('customers.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(["email"])
    for username in usernames:
        writer.writerow([username+"@mail.com"])
# MYSQL insert query: LOAD DATA INFILE 'path' INTO TABLE tables FIELDS TERMINATED BY ','  LINES TERMINATED BY '\r\n' IGNORE 1 ROWS (cols);

