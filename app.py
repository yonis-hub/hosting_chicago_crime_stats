# Import the functions we need from flask
from flask import Flask
from flask import render_template 
from flask import jsonify
from config import username, password
import pandas as pd

# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

# Define the database connection parameters
database_name = 'chicago_violent_crimes_db' # Created in Week 9, Night 1, Exercise 08-Stu_CRUD 
connection_string = f'postgresql://{username}:{password}@localhost:5432/{database_name}'

# Connect to the database
engine = create_engine(connection_string)
base = automap_base()
base.prepare(engine, reflect=True)

# Choose the table we wish to use
violent_crimes = base.classes.violent_crimes

# Instantiate the Flask application. (Chocolate cake recipe.)
# This statement is required for Flask to do its job. 
app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False # so the json does not order the jsonified list
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 # Effectively disables page caching

# Here's where we define the various application routes ...
@app.route("/")
def IndexRoute():
    ''' This function runs when the browser loads the index route. 
        Note that the html file must be located in a folder called templates. '''

    webpage = render_template("index.html")
    return webpage

# Team page route, populated from the team html page
@app.route("/MeetTheTeam")
def TeamRoute():
    
    webpage = render_template("team.html")
    return webpage

@app.route("/crimeCalendar")
def crimeCalenderPage():

   # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(violent_crimes.id, violent_crimes.date, violent_crimes.primary_type).all()     
    session.close()

    calendar_data = []

    for id, date, primary_type in results:
        dict = {}
        dict ["id"] = id
        dict ["date"] = date
        dict ["primary_type"] = primary_type
        calendar_data.append(dict)

    # return json
    return jsonify(calendar_data)


#     return webpage
@app.route("/crimeCalendarPage")
def crimeCalendarRoute():
    webpage = render_template("crimeCalendar.html")
    return webpage


# Arrest data route for the sunburst chart
@app.route("/arrestChartData")
def arrestChartData():
    
    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(violent_crimes.id, violent_crimes.primary_type, violent_crimes.arrest).all()
    session.close()

    arrest_chart_data = []
        
    for id, primary_type, arrest in results: 
        dict = {}
        dict ["id"] = id
        dict ["primary_type"] = primary_type
        dict ["arrest"] = arrest
        arrest_chart_data.append(dict)

    # Return the jsonified result. 
    return jsonify(arrest_chart_data)


# Arrest sunburst chart route
@app.route("/arrestChartPage")
def arrestChartRoute():
    webpage = render_template("arrestChart.html")
    return webpage



@app.route("/crimeMap")
def crimeMapPage():
    webpage = render_template("crimeMap.html")
  
    
    return webpage


@app.route("/showData")
def crimeData():

    # Open a session, run the query, and then close the session again
    session = Session(engine)
    results = session.query(violent_crimes.id, violent_crimes.date, violent_crimes.primary_type, violent_crimes.description, violent_crimes.arrest, violent_crimes.domestic,violent_crimes.district, violent_crimes.year, violent_crimes.latitude, violent_crimes.longitude).all()
    session.close()

    #CREATE A LIST OF DICTIONRARIES
    all_crime_data = []
    # ONLY GETTING THE FIRST 100 ROWS OF DATA
    #Create a list of dictionaries, with each dictionary containing one row from the query
    for id, date, primary_type, description, arrest, domestic, district, year, latitude, longitude in results[:10000]: 
        dict = {}
        dict ["id"] = id
        dict ["date"] = date
        dict ["primary_type"] = primary_type
        dict ["description"] = description
        dict ["arrest"] = arrest
        dict ["domestic"] = domestic
        dict ["district"] = district
        dict ["year"] = year
        dict ["latitude"] = latitude
        dict ["longitude"] = longitude
        all_crime_data.append(dict)


    return jsonify(all_crime_data)
    
@app.route("/showDataPage")
def showDataPage():
    webpage = render_template("rawdata.html")
    return webpage


# This statement is required for Flask to do its job. 
# Think of it as chocolate cake recipe. 
if __name__ == '__main__':
    app.run(debug=True)
