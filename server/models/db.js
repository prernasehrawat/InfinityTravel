const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./infinity-travel.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    createTables();
  }
});

// Helper function to generate a coupon code
const generateCouponCode = () => {
  return "COUPON-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Function to create tables
const createTables = () => {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        hashed_password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        email TEXT UNIQUE NOT NULL,
        phone_number TEXT,
        coupon_code TEXT UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS hotel_bookings (
        booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        hotel_name TEXT NOT NULL,
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        room_type TEXT,
        total_cost DECIMAL(10, 2) NOT NULL,
        booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS flights (
        flight_id INTEGER PRIMARY KEY AUTOINCREMENT,
        flight_number TEXT NOT NULL UNIQUE,
        airline TEXT NOT NULL,
        departure_airport TEXT NOT NULL,
        arrival_airport TEXT NOT NULL,
        departure_time DATETIME NOT NULL,
        arrival_time DATETIME NOT NULL,
        base_cost DECIMAL(10, 2) NOT NULL,
        stops INTEGER NOT NULL DEFAULT 0
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS flight_reservations (
        reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        flight_id INTEGER,
        passenger_name TEXT NOT NULL,
        seat_class TEXT,
        total_cost DECIMAL(10, 2) NOT NULL,
        reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (flight_id) REFERENCES flights(flight_id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS car_services (
        service_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        pickup_location TEXT NOT NULL,
        dropoff_location TEXT NOT NULL,
        car_type TEXT,
        driver_name TEXT,
        pickup_time DATETIME NOT NULL,
        dropoff_time DATETIME,
        service_cost DECIMAL(10, 2),
        service_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS payments (
        payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        payment_method TEXT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS itineraries (
        itinerary_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        itinerary_name TEXT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS itinerary_details (
        detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
        itinerary_id INTEGER,
        hotel_booking_id INTEGER,
        flight_reservation_id INTEGER,
        car_service_id INTEGER,
        FOREIGN KEY (itinerary_id) REFERENCES itineraries(itinerary_id),
        FOREIGN KEY (hotel_booking_id) REFERENCES hotel_bookings(booking_id),
        FOREIGN KEY (flight_reservation_id) REFERENCES flight_reservations(reservation_id),
        FOREIGN KEY (car_service_id) REFERENCES car_services(service_id)
      );
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS favourites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        search_params TEXT DEFAULT '{}',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      );
    `);
    console.log("Tables created successfully.");
    seedUsers();
  });
};

// Seed functions
const seedUsers = () => {
  db.get(`SELECT COUNT(*) as count FROM users`, (err, row) => {
    if (row?.count === 0) {
      db.run(
        `
        INSERT INTO users (first_name, last_name, hashed_password, role, email, phone_number, coupon_code)
        VALUES 
          ('John', 'Doe', 'hashedpassword1', 'user', 'john.doe@example.com', '555-1234', '${generateCouponCode()}'),
          ('Jane', 'Smith', 'hashedpassword2', 'user', 'jane.smith@example.com', '555-5678', '${generateCouponCode()}'),
          ('Mike', 'Johnson', 'hashedpassword3', 'user', 'mike.johnson@example.com', '555-9101', '${generateCouponCode()}'),
          ('IT', 'Admin', 'adminpassword', 'admin', 'admin@infinity-travel.com', '555-5531', '${generateCouponCode()}');
      `,
        (err) => {
          if (!err) {
            console.log("Users seeded successfully.");
            seedHotelBookings();
          }
        }
      );
    }
  });
};

const seedHotelBookings = () => {
  db.all(`SELECT user_id FROM users`, (err, users) => {
    const user1 = users[0].user_id;
    const user2 = users[1].user_id;

    db.run(
      `
      INSERT INTO hotel_bookings (user_id, hotel_name, check_in_date, check_out_date, room_type, total_cost)
      VALUES 
        (${user1}, 'Grand Hotel', '2024-10-10', '2024-10-15', 'Deluxe', 500.00),
        (${user2}, 'Sunset Resort', '2024-11-01', '2024-11-05', 'Suite', 750.00);
    `,
      (err) => {
        if (!err) {
          console.log("Hotel bookings seeded successfully.");
          seedFlights();
        }
      }
    );
  });
};

const seedFlights = () => {
  db.run(
    `
    INSERT INTO flights (flight_number, airline, departure_airport, arrival_airport, departure_time, arrival_time, base_cost, stops)
    VALUES
      ('AA123', 'DELTA', 'JFK', 'LAX', '2024-11-10 08:00:00', '2024-11-10 11:30:00', 300.00, 0),
      ('BA456', 'AMERICAN', 'LAX', 'ORD', '2024-11-11 15:00:00', '2024-11-11 21:00:00', 250.00, 0),
      ('DL789', 'UNITED', 'ORD', 'ATL', '2024-11-12 06:00:00', '2024-11-12 09:00:00', 150.00, 1),
      ('F001', 'FRONTIER', 'JFK', 'SFO', '2024-11-13 07:00:00', '2024-11-13 12:00:00', 200.00, 1),
      ('AA456', 'DELTA', 'LAX', 'ORD', '2024-11-14 10:30:00', '2024-11-14 16:00:00', 280.00, 0),
      ('BA789', 'AMERICAN', 'ORD', 'ATL', '2024-11-15 12:45:00', '2024-11-15 15:30:00', 180.00, 0),
      ('DL012', 'UNITED', 'ATL', 'JFK', '2024-11-16 09:00:00', '2024-11-16 11:45:00', 220.00, 0),
      ('F234', 'FRONTIER', 'JFK', 'CDG', '2024-11-17 14:30:00', '2024-11-18 03:00:00', 450.00, 1),
      ('AA678', 'DELTA', 'CDG', 'LHR', '2024-11-18 07:15:00', '2024-11-18 08:30:00', 150.00, 0),
      ('BA901', 'AMERICAN', 'LHR', 'HND', '2024-11-19 11:00:00', '2024-11-20 06:45:00', 800.00, 1),
      ('DL234', 'UNITED', 'HND', 'SFO', '2024-11-20 13:30:00', '2024-11-20 08:00:00', 600.00, 1),
      ('F456', 'FRONTIER', 'SFO', 'ORD', '2024-11-21 06:00:00', '2024-11-21 12:15:00', 280.00, 0),
      ('AA789', 'DELTA', 'ORD', 'ATL', '2024-11-22 08:45:00', '2024-11-22 11:00:00', 200.00, 0),
      ('BA012', 'AMERICAN', 'ATL', 'DXB', '2024-11-23 15:30:00', '2024-11-24 12:00:00', 950.00, 1),
      ('DL345', 'UNITED', 'DXB', 'SIN', '2024-11-24 17:45:00', '2024-11-25 09:30:00', 800.00, 1),
      ('F678', 'FRONTIER', 'SIN', 'JFK', '2024-11-25 14:00:00', '2024-11-26 02:30:00', 900.00, 2),
      ('AA890', 'DELTA', 'JFK', 'LAX', '2024-11-26 06:30:00', '2024-11-26 10:00:00', 320.00, 0),
      ('BA109', 'AMERICAN', 'LAX', 'ORD', '2024-11-27 13:45:00', '2024-11-27 19:30:00', 270.00, 0),
      ('DL456', 'UNITED', 'ORD', 'ATL', '2024-11-28 07:15:00', '2024-11-28 10:00:00', 160.00, 1),
      ('F789', 'FRONTIER', 'ATL', 'JFK', '2024-11-29 11:30:00', '2024-11-29 14:15:00', 220.00, 0),
      ('AA901', 'DELTA', 'JFK', 'CDG', '2024-11-30 16:00:00', '2024-11-31 05:30:00', 450.00, 1),
      ('BA210', 'AMERICAN', 'CDG', 'LHR', '2024-11-30 08:45:00', '2024-11-30 09:45:00', 160.00, 0),
      ('DL567', 'UNITED', 'LHR', 'HND', '2024-11-30 13:00:00', '2024-12-01 04:30:00', 780.00, 1),
      ('F890', 'FRONTIER', 'HND', 'SFO', '2024-11-30 20:00:00', '2024-12-01 06:00:00', 650.00, 1);
  `,
    (err) => {
      if (!err) {
        console.log("Flights seeded successfully.");
        seedFlightReservations();
      }
    }
  );
};

const seedFlightReservations = () => {
  db.all(`SELECT user_id FROM users`, (err, users) => {
    db.all(`SELECT flight_id FROM flights`, (err, flights) => {
      const user1 = users[0].user_id;
      const user2 = users[1].user_id;
      const flight1 = flights[0].flight_id;
      const flight2 = flights[1].flight_id;

      db.run(
        `
        INSERT INTO flight_reservations (user_id, flight_id, passenger_name, seat_class, total_cost)
        VALUES 
          (${user1}, ${flight1}, 'John Doe', 'Economy', 320.00),
          (${user2}, ${flight2}, 'Jane Smith', 'Business', 400.00);
      `,
        (err) => {
          if (!err) {
            console.log("Flight reservations seeded successfully.");
            seedCarServices();
          }
        }
      );
    });
  });
};

const seedCarServices = () => {
  db.all(`SELECT user_id FROM users`, (err, users) => {
    const user1 = users[0].user_id;
    const user2 = users[1].user_id;

    db.run(
      `
      INSERT INTO car_services (user_id, pickup_location, dropoff_location, car_type, driver_name, pickup_time, service_cost)
      VALUES 
        (${user1}, 'JFK Airport', 'Grand Hotel', 'Sedan', 'James Driver', '2024-10-10 11:30:00', 100.00),
        (${user2}, 'LHR Airport', 'Sunset Resort', 'SUV', 'Alice Driver', '2024-11-01 11:30:00', 120.00);
    `,
      (err) => {
        if (!err) {
          console.log("Car services seeded successfully.");
          seedPayments();
        }
      }
    );
  });
};

const seedPayments = () => {
  db.all(`SELECT user_id FROM users`, (err, users) => {
    const user1 = users[0].user_id;
    const user2 = users[1].user_id;

    db.run(
      `
      INSERT INTO payments (user_id, payment_method, amount)
      VALUES 
        (${user1}, 'Credit Card', 900.00),
        (${user2}, 'PayPal', 1470.00);
    `,
      (err) => {
        if (!err) {
          console.log("Payments seeded successfully.");
          seedItineraries();
        }
      }
    );
  });
};

const seedItineraries = () => {
  db.all(`SELECT user_id FROM users`, (err, users) => {
    const user1 = users[0].user_id;
    const user2 = users[1].user_id;

    db.run(
      `
      INSERT INTO itineraries (user_id, itinerary_name, start_date, end_date)
      VALUES 
        (${user1}, 'Vacation in NYC', '2024-10-10', '2024-10-15'),
        (${user2}, 'Business Trip to LA', '2024-11-01', '2024-11-05');
    `,
      (err) => {
        if (!err) {
          console.log("Itineraries seeded successfully.");
        }
      }
    );
  });
};

module.exports = {
  db,
};
