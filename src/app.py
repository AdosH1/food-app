from flask import Flask, request
from openai.query import meal_plan_query

app = Flask(__name__)

@app.route('/')
def hello():
    return '<h1>Hello World!</h1>'

@app.route('/meal-plan', methods=['POST'])
def meal_plan():
    user_input = request.form['user_input']
    response = meal_plan_query(user_input)
    return response.content

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)
