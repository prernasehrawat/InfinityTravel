// import sqlite3 from "sqlite3";
const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database
const db = new sqlite3.Database("./infinity-travel.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");

    // Create tables if they don't exist
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
      CREATE TABLE IF NOT EXISTS flight_reservations (
        reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        flight_number TEXT NOT NULL,
        departure_airport TEXT NOT NULL,
        arrival_airport TEXT NOT NULL,
        departure_time DATETIME NOT NULL,
        arrival_time DATETIME NOT NULL,
        passenger_name TEXT NOT NULL,
        seat_class TEXT,
        total_cost DECIMAL(10, 2) NOT NULL,
        reservation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
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
  }
});

// // Seed data method
// const seedData = () => {
//   // Seed the users table
//   db.get(`SELECT COUNT(*) as count FROM users`, (err, row) => {
//     if (err) {
//       console.error("Error querying users count:", err.message);
//       return;
//     }
//
//     if (row?.count === 0) {
//       db.run(
//         `
//         INSERT INTO users (first_name, last_name, hashed_password, email, phone_number)
//         VALUES
//           ('John', 'Doe', 'hashedpassword1', 'john.doe@example.com', '555-1234'),
//           ('Jane', 'Smith', 'hashedpassword2', 'jane.smith@example.com', '555-5678'),
//           ('Mike', 'Johnson', 'hashedpassword3', 'mike.johnson@example.com', '555-9101');
//       `,
//         function (err) {
//           if (err) {
//             console.error(err);
//           } else {
//             console.log("Users seeded successfully.");
//
//             // Get the inserted user IDs
//             db.all(`SELECT user_id FROM users`, (err, users) => {
//               if (users.length > 0) {
//                 const user1 = users[0].user_id;
//                 const user2 = users[1].user_id;
//                 const user3 = users[2].user_id;
//
//                 // Seed the hotel_bookings table
//                 db.run(
//                   `
//                 INSERT INTO hotel_bookings (user_id, hotel_name, check_in_date, check_out_date, room_type, total_cost)
//                 VALUES
//                   (${user1}, 'Grand Hotel', '2024-10-10', '2024-10-15', 'Deluxe', 500.00),
//                   (${user2}, 'Sunset Resort', '2024-11-01', '2024-11-05', 'Suite', 750.00);
//               `,
//                   function (err) {
//                     if (err) {
//                       console.error(err);
//                     } else {
//                       console.log("Hotel bookings seeded.");
//
//                       // Seed the flight_reservations table
//                       db.run(
//                         `
//                     INSERT INTO flight_reservations (user_id, flight_number, departure_airport, arrival_airport, departure_time, arrival_time, passenger_name, seat_class, total_cost)
//                     VALUES
//                       (${user1}, 'AA123', 'JFK', 'LAX', '2024-10-10 08:00:00', '2024-10-10 11:00:00', 'John Doe', 'Economy', 300.00),
//                       (${user2}, 'BA456', 'LHR', 'CDG', '2024-11-01 09:00:00', '2024-11-01 11:00:00', 'Jane Smith', 'Business', 600.00);
//                   `,
//                         function (err) {
//                           if (err) {
//                             console.error(err);
//                           } else {
//                             console.log("Flight reservations seeded.");
//
//                             // Seed the car_services table
//                             db.run(
//                               `
//                         INSERT INTO car_services (user_id, pickup_location, dropoff_location, car_type, driver_name, pickup_time, service_cost)
//                         VALUES
//                           (${user1}, 'JFK Airport', 'Grand Hotel', 'Sedan', 'James Driver', '2024-10-10 11:30:00', 100.00),
//                           (${user2}, 'LHR Airport', 'Sunset Resort', 'SUV', 'Alice Driver', '2024-11-01 11:30:00', 120.00);
//                       `,
//                               function (err) {
//                                 if (err) {
//                                   console.error(err);
//                                 } else {
//                                   console.log("Car services seeded.");
//
//                                   // Seed the payments table
//                                   db.run(
//                                     `
//                             INSERT INTO payments (user_id, payment_method, amount)
//                             VALUES
//                               (${user1}, 'Credit Card', 900.00),
//                               (${user2}, 'PayPal', 1470.00);
//                           `,
//                                     function (err) {
//                                       if (err) {
//                                         console.error(err);
//                                       } else {
//                                         console.log("Payments seeded.");
//
//                                         // Seed the itineraries table
//                                         db.run(
//                                           `
//                                 INSERT INTO itineraries (user_id, itinerary_name, start_date, end_date)
//                                 VALUES
//                                   (${user1}, 'John’s LA Trip', '2024-10-10', '2024-10-15'),
//                                   (${user2}, 'Jane’s Paris Vacation', '2024-11-01', '2024-11-05');
//                               `,
//                                           function (err) {
//                                             if (err) {
//                                               console.error(err);
//                                             } else {
//                                               console.log(
//                                                 "Itineraries seeded."
//                                               );
//
//                                               // Get the inserted itinerary IDs and booking IDs
//                                               db.all(
//                                                 `SELECT itinerary_id FROM itineraries`,
//                                                 (err, itineraries) => {
//                                                   db.all(
//                                                     `SELECT booking_id FROM hotel_bookings`,
//                                                     (err, hotelBookings) => {
//                                                       db.all(
//                                                         `SELECT reservation_id FROM flight_reservations`,
//                                                         (
//                                                           err,
//                                                           flightReservations
//                                                         ) => {
//                                                           db.all(
//                                                             `SELECT service_id FROM car_services`,
//                                                             (
//                                                               err,
//                                                               carServices
//                                                             ) => {
//                                                               if (
//                                                                 itineraries.length >
//                                                                   0 &&
//                                                                 hotelBookings.length >
//                                                                   0 &&
//                                                                 flightReservations.length >
//                                                                   0 &&
//                                                                 carServices.length >
//                                                                   0
//                                                               ) {
//                                                                 const itinerary1 =
//                                                                   itineraries[0]
//                                                                     .itinerary_id;
//                                                                 const itinerary2 =
//                                                                   itineraries[1]
//                                                                     .itinerary_id;
//                                                                 const hotelBooking1 =
//                                                                   hotelBookings[0]
//                                                                     .booking_id;
//                                                                 const hotelBooking2 =
//                                                                   hotelBookings[1]
//                                                                     .booking_id;
//                                                                 const flightReservation1 =
//                                                                   flightReservations[0]
//                                                                     .reservation_id;
//                                                                 const flightReservation2 =
//                                                                   flightReservations[1]
//                                                                     .reservation_id;
//                                                                 const carService1 =
//                                                                   carServices[0]
//                                                                     .service_id;
//                                                                 const carService2 =
//                                                                   carServices[1]
//                                                                     .service_id;
//
//                                                                 // Seed the itinerary_details table
//                                                                 db.run(
//                                                                   `
//                                               INSERT INTO itinerary_details (itinerary_id, hotel_booking_id, flight_reservation_id, car_service_id)
//                                               VALUES
//                                                 (${itinerary1}, ${hotelBooking1}, ${flightReservation1}, ${carService1}),
//                                                 (${itinerary2}, ${hotelBooking2}, ${flightReservation2}, ${carService2});
//                                             `,
//                                                                   function (
//                                                                     err
//                                                                   ) {
//                                                                     if (err) {
//                                                                       console.error(
//                                                                         err
//                                                                       );
//                                                                     } else {
//                                                                       console.log(
//                                                                         "Itinerary details seeded successfully."
//                                                                       );
//                                                                     }
//                                                                   }
//                                                                 );
//                                                               }
//                                                             }
//                                                           );
//                                                         }
//                                                       );
//                                                     }
//                                                   );
//                                                 }
//                                               );
//                                             }
//                                           }
//                                         );
//                                       }
//                                     }
//                                   );
//                                 }
//                               }
//                             );
//                           }
//                         }
//                       );
//                     }
//                   }
//                 );
//               }
//             });
//           }
//         }
//       );
//     } else {
//       console.log("Users already seeded.");
//     }
//   });
// };

// Helper function to generate a coupon code
const generateCouponCode = () => {
    return 'COUPON-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Seed data method
const seedData = () => {
    // Seed the users table
    db.get(`SELECT COUNT(*) as count FROM users`, (err, row) => {
        if (err) {
            console.error("Error querying users count:", err.message);
            return;
        }

        if (row?.count === 0) {
            db.run(
                `
        INSERT INTO users (first_name, last_name, hashed_password, email, phone_number, coupon_code)
        VALUES 
          ('John', 'Doe', 'hashedpassword1', 'john.doe@example.com', '555-1234', '${generateCouponCode()}'),
          ('Jane', 'Smith', 'hashedpassword2', 'jane.smith@example.com', '555-5678', '${generateCouponCode()}'),
          ('Mike', 'Johnson', 'hashedpassword3', 'mike.johnson@example.com', '555-9101', '${generateCouponCode()}');
      `,
                function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Users seeded successfully.");
                        // Proceed with other seed data as you have it...
                    }
                }
            );
        } else {
            console.log("Users already seeded.");
        }
    });
};


module.exports = {
  db,
  seedData,
};
