import psycopg2
import sys
from flask import Flask,render_template
from flask import jsonify

app = Flask(__name__)

#################################################
# Database Setup
#################################################

#from config import username, password, server, database

username = "postgres"
password = "password"
server = "marvelcharacters.cnzcqo7polqc.us-east-2.rds.amazonaws.com"
database = "new"

conn = f'postgresql+psycopg2://{username}:{password}@{server}/{database}'

from flask_sqlalchemy import SQLAlchemy
#app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///db.sqlite"
app.config['SQLALCHEMY_DATABASE_URI'] = conn
# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class characters(db.Model):
    __tablename__ = 'marvel_characters'

    ID = db.Column(db.BigInteger, primary_key=True)
    Name = db.Column(db.BigInteger)
    Alignment = db.Column(db.Text)
    Gender = db.Column(db.Text)
    EyeColor = db.Column(db.Text)
    Race = db.Column(db.Text)
    HairColor = db.Column(db.Text)
    Publisher = db.Column(db.Text)
    SkinColor = db.Column(db.Text)
    Height = db.Column(db.Float)
    Weight = db.Column(db.Float)

    def __repr__(self):
        return '<characters %r>' % (self.urls)

#################################################
# Flask Routes
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("../Marvel/index.html")

@app.route("/data/api")
def return_json():
    results = db.session.query(characters.rowid, characters.page_id, characters.name, characters.ID, characters.ALIGN, characters.EYE, characters.HAIR, characters.SEX, characters.ALIVE, characters.APPEARANCES, characters.Year).all()

    character_list = []

    for result in results:

        data_characters = {
            "rowid": result[0],
            "page_id": result[1],
            "name": result[2],
            "ID": result[3],
            "ALIGN": result[4],
            "EYE": result[5],
            "HAIR": result[6],
            "SEX": result[7],
            "ALIVE": result[8],
            "APPEARANCES": result[9],
            "Year": result[10]
        }
        character_list.append(data_characters)

    return jsonify(character_list)

if __name__ == "__main__":
    app.run(debug=True)