const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database connection
const dbPath = path.join(__dirname, "database.sqlite");

// connect to the database SQLite-DATABASE
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
})

// Create tabel for the Furniture Generator (if not existed)
db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS configurations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerID TEXT UNIQUE, 
        shape TEXT, 
        material TEXT, 
        stitching TEXT, 
        color TEXT
      )`,
      (err) => {
        if (err) {
          console.error("❌ Error creating table:", err.message);
        } else {
          console.log("✅ Table 'configurations' successfully created (if not existed).");
        }
      }
    );
  });

// Export the database connection
module.exports = db;