from flask import Flask, render_template

# Import pymongo library
import pymongo

# Create an instance of our Flask app.
app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

# Create Database
db = client.superhero_db

# Drops collection if available to remove duplicates
db.superhero.drop()

# Creates a collection in the database and inserts two documents
db.superhero.insert_many(
    [
        {
            'hero': 'Superman',
            'power': 'super man stuff'
        },
        {
            'hero': 'Flash',
            'power': 'real fast'
        },
        {
            'hero': 'Ironman',
            'power': 'Money'
        },
        {
            'hero': 'Eric & Falconi',
            'power': 'Knowledge'
        }
    ]
)


# Set route
@app.route('/')
def index():
    # Store the entire hero collection in a list
    superheroes = list(db.superhero.find())
    print(superheroes)

    # Return the template with the heroes list passed in
    return render_template('index.html', superheroes=superheroes)


if __name__ == "__main__":
    app.run(debug=True)
