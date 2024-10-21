# Setup instructions

- Run "bash setup.sh" to install necessary libraries and packages
- Run "node server.js" to start the server

# Db setup instructions

- navigate to the server folder
- run `npm i`.
- run `sqlite3 infinity-travel.db` in the console. Leave the cli running.
- Uncomment seedData() from the server.js file. This will create the tables and add initial data to it.
- run your server with npm start.
- Comment out seedData(), you won't need it after the first run.
- Run select \* from users; in the sqlite cli. If you see 3 users, everything went well. You can exit the cli with .exit.
