# chicago-crime-stats

### Overview
This repo contains a demonstration of web development to render a website that uses leaflet.js and plotly to analyze Chicago Crime statistics. The datasource used includes information such as date/time reported incidents occurred, location (block & coordinates), type of crime, description, and whether an arrest was made or not.

### ETL Instructions
#### Clone this repo
1. Navigate to the [Chicago Crime Stats Repo](https://github.com/NHoyer95/chicago-crime-stats) and select the green "Code" dropdown
2. Copy the SSH Key to your clipboard
3. Open a Gitbash or Terminal from your desired file location and clone the repo using the git clone command, followed by the SSH Key from your clipboard - NOTE: Do not close this terminal

#### Create and Configure a PostrgeSQL DB
1. Open pgAdmin 4 from [PostgreSQL 12 or later](https://www.postgresql.org/)
2. Create a new db named "chicago_violent_crimes_db" with Postgres as the user
3. Right-click the new database and open a Query Tool
4. In the Query Editor, click to the "Open File" button and navigate to the Chicago Crimes Repo in your local drive
5. Select the **"violent_crimes.sql"** file from the directory "static > sql" and run the create statement located in the file to create the required table
6. Run the `select * from` statement at the bottom of the SQL query form to ensure that the table has been created and the data types are reflected properly - NOTE: Do not close this pgAdmin session

#### Create the Required DataFrames and Populate the PostgreSQL DB using a Jupyter Notebook
1. From the Gitbash or Terminal session mentioned in step 3 of Setup Instructions, run `source activate PythonData` followed by `jupyter notebook` to launch a Jupyter session
2. Create a new config.py file to store your credentials by selecting "New > Text File" in the upper right hand corner of the page
3. Rename the Text File to "config.py" and enter your username and password into the body of the file with the format `username = "enter your username here"` and `password = "enter your password here"` then save the config.py file
4. Open the **"chicago_main.ipynb"** file and select "Kernel > Restart & Run All" to extract the data from the CSV file into a DataFrame, transform the data into the appropriate format, and load it into the corresponding PostgreSQL table that was created in earlier steps

#### Confirm that ETL Worked as Expected
1. Navigate back to the pgAdmin session that should still be running
2. Run the `select` statement at the bottom of the SQL query form
3. Notice that stats from the Chicago Crimes csv have been properly loaded into the corresponding table in the PostgreSQL DB and are available for analysis

### Viewing the Website via Flask Server
From the Gitbash or Terminal session mentioned in step 3 of Setup Instructions, run `python app.py` from the git repo on your local machine. This will launch a Flask server that can then be accessed from a Chrome browser window.

Enjoy :)
