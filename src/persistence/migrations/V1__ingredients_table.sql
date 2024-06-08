-- Create the ingredients table
CREATE TABLE ingredients
(
    item_id    BIGINT PRIMARY KEY,
    name       TEXT NOT NULL,
    cost       BIGINT NOT NULL,
    item_link  TEXT NOT NULL

);

-- Fill the table with information from the CSV file
COPY ingredients(name, cost, item_link)
FROM '/docker-entrypoint-initdb.d/ingredients_list.csv'
DELIMITER ','
CSV HEADER;
