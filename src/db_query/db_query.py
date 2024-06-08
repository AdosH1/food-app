import psycopg2


class Item:
    def __init__(self, item_id, item_name, item_price, item_link):
        self.item_id = item_id
        self.item_name = item_name
        self.item_price = item_price
        self.item_link = item_link


def print_items():

    conn = psycopg2.connect(
        dbname="postgres", user="postgres", password="postgres", host="localhost", port="5432")
    curr = conn.cursor()

    curr.execute("SELECT * FROM ingredients;")

    rows = curr.fetchall()

    for row in rows:
        print(row)

    curr.close()
    conn.close()


print_items()
