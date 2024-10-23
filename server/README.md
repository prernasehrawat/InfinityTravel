# Setup instructions

- Run "bash setup.sh" to install necessary libraries and packages
- Run "node server.js" to start the server

# Db setup instructions

- navigate to the server folder
- delete infinity-travel.db if it exists.
- run `npm i`.
- run `sqlite3 infinity-travel.db` in the console. Leave the cli running.
- Uncomment seedData() from the server.js file. This will create the tables and add initial data to it.
- run your server with npm start.
- Comment out seedData(), you won't need it after the first run.
- Run select \* from users; in the sqlite cli. If you see 3 users, everything went well. You can exit the cli with .exit.

#Testing for sorting logic

- Run `sqlite3 infinity-travel.db` in the console and then run following commands in sqlite cli to add flights with different cost to same destination and same date

1) INSERT INTO flight_reservations (user_id, flight_number, departure_airport, arrival_airport, departure_time, arrival_time, passenger_name, seat_class, total_cost) VALUES (1, 'DL789', 'ATL', 'LAX', '2024-12-15 07:00:00', '2024-12-15 10:00:00', 'John Doe', 'Economy', 700.00);

2) INSERT INTO flight_reservations (user_id, flight_number, departure_airport, arrival_airport, departure_time, arrival_time, passenger_name, seat_class, total_cost) VALUES (1, 'DL789', 'ATL', 'LAX', '2024-12-15 07:00:00', '2024-12-15 10:00:00', 'John Doe', 'Economy', 800.00);

3) INSERT INTO flight_reservations (user_id, flight_number, departure_airport, arrival_airport, departure_time, arrival_time, passenger_name, seat_class, total_cost) VALUES (1, 'DL789', 'ATL', 'LAX', '2024-12-15 07:00:00', '2024-12-15 10:00:00', 'John Doe', 'Economy', 900.00);


2) Now start the server with npm start and then run curl http://localhost:8000/destination/destination/LAX/date/2024-12-15
