import psycopg2
import json


class Item:
    def __init__(self, item_id, item_name, item_price, item_link):
        self.item_id = item_id
        self.item_name = item_name
        self.item_price = item_price
        self.item_link = item_link


def get_items_JSON():

    conn = psycopg2.connect(
        dbname="postgres", user="postgres", password="postgres", host="localhost", port="5432")
    curr = conn.cursor()

    curr.execute("SELECT * FROM ingredients;")

    rows = curr.fetchall()

    data = []

    for row in rows:

        data.append([row[0], row[1], float(row[2]), row[3]])

    # convert list of tuples to json

    curr.close()
    conn.close()

    ingredients_list = [
        {
            'item_id': item_id,
            'name': name,
            'cost': cost,
            'item_link': item_link
        }
        for item_id, name, cost, item_link in data
    ]


# Convert list of dictionaries to JSON
    ingredients_json = json.dumps(ingredients_list, indent=2)

    return ingredients_json


get_items_JSON()
