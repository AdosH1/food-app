import os
from groq import Groq

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

meal_plan_context = {"role": "system", "content": "You are a meal planner, skilled in creating balanced and nutritious meals plans for individuals with dietary restrictions."}

def meal_plan_query(user_input):
    groq_input = {"role": "user", "content": user_input}

    meal_plan = client.chat.completions.create(
        messages=[
            meal_plan_context, 
            groq_input,
          ],
        model="llama3-8b-8192",
    )
    return meal_plan.choices[0].message
