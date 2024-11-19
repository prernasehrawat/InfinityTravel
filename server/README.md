# Setup instructions

- Run "bash setup.sh" to install necessary libraries and packages
- Run "node server.js" to start the server

# Db setup instructions

- navigate to the server folder
- delete infinity-travel.db if it exists.
- run `npm i`.
- run `sqlite3 infinity-travel.db` in the console. Leave the cli running.
- run your server with npm start. This will create the tables and add initial data to it, as long as the db is empty.
- Run select \* from users; in the sqlite cli. If you see 3 users, everything went well. You can exit the cli with .exit.

# Testing for Notifcation logic

- Login to google account where we will receive notifications: username:infinitytravel46@gmail.com password: infinitytravel46infinitytravel46
- Run "bash setup.sh" to install necessary libraries and packages
- Run "node server.js" to start the server
- Run following curl command from another server
curl "http://localhost:8000/notification?name=John&cost=500&source=NYC&destination=LAX"
- After running curl command, we can see notification email in inbox

# Testing for Metrics logic

- Run "bash setup.sh" to install necessary libraries and packages
- Run "node server.js" to start the server
- Run following curl command from another server

1) For SEA-IAD route:

### Hourly data
curl "http://localhost:8000/metric?timeFrame=hourly&source=SEA&destination=IAD&date=2024-01-15"

### Monthly data
curl "http://localhost:8000/metric?timeFrame=monthly&source=SEA&destination=IAD&startDate=2024-01&endDate=2024-03"

2)For LAX-JFK route:

### Hourly data
curl "http://localhost:8000/metric?timeFrame=hourly&source=LAX&destination=JFK&date=2024-01-15"

### Monthly data
curl "http://localhost:8000/metric?timeFrame=monthly&source=LAX&destination=JFK&startDate=2024-01&endDate=2024-03"

2)For SFO-BOS route::

### Hourly data
curl "http://localhost:8000/metric?timeFrame=hourly&source=SFO&destination=BOS&date=2024-01-15"

### Monthly data
curl "http://localhost:8000/metric?timeFrame=monthly&source=SFO&destination=BOS&startDate=2024-01&endDate=2024-03"

# Testing for sorting logic

- Run `sqlite3 infinity-travel.db` in the console and then run following commands in sqlite cli to add flights with different cost to same destination and same date

1. INSERT INTO flight_reservations (user_id, flight_number, departure_airport, arrival_airport, departure_time, arrival_time, passenger_name, seat_class, total_cost) VALUES (1, 'DL789', 'ATL', 'LAX', '2024-12-15 07:00:00', '2024-12-15 10:00:00', 'John Doe', 'Economy', 700.00);

2. INSERT INTO flight_reservations (user_id, flight_number, departure_airport, arrival_airport, departure_time, arrival_time, passenger_name, seat_class, total_cost) VALUES (1, 'DL789', 'ATL', 'LAX', '2024-12-15 07:00:00', '2024-12-15 10:00:00', 'John Doe', 'Economy', 800.00);

3. INSERT INTO flight_reservations (user_id, flight_number, departure_airport, arrival_airport, departure_time, arrival_time, passenger_name, seat_class, total_cost) VALUES (1, 'DL789', 'ATL', 'LAX', '2024-12-15 07:00:00', '2024-12-15 10:00:00', 'John Doe', 'Economy', 900.00);

4. Now start the server with npm start and then run "curl http://localhost:8000/destination/LAX/date/2024-12-15"

#Testing for search logic

1) Temprory workaround: Update the flights table through sql command line to add column of stops and airline with following commands

i) ALTER TABLE flights ADD COLUMN stops INTEGER;
ii) UPDATE flights SET stops = 0;

iii) ALTER TABLE flights ADD COLUMN airline TEXT;
iv) UPDATE flights SET airline = 'Unknown';
v) ALTER TABLE users ADD COLUMN rewards_points INTEGER DEFAULT 0;


2) Now run following commands to search flights using three different parameters

curl "http://localhost:8000/search?maxPrice=280"

curl "http://localhost:8000/search?stops=0"

curl "http://localhost:8000/search?airline=DL"
