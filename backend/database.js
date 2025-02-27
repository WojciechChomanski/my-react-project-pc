const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Database connection
const dbPath = path.join(__dirname, "database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
  } else {
    console.log("✅ Connected to the SQLite database.");
  }
});

// Create tables if they do not exist
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS configurations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerID TEXT UNIQUE, 
      shape TEXT, 
      material TEXT, 
      stitching TEXT, 
      color TEXT,
      image TEXT
    )`,
    (err) => {
      if (err) {
        console.error("❌ Error creating 'configurations' table:", err.message);
      } else {
        console.log("✅ Table 'configurations' successfully created.");
      }
    }
  );

  // 🟢 **Create the 'customers' table if it does not exist**
  db.run(
    `CREATE TABLE IF NOT EXISTS customers (
      customerID TEXT PRIMARY KEY,
      logo TEXT,
      primaryColor TEXT,
      backgroundColor TEXT,
      textColor TEXT
    )`,
    (err) => {
      if (err) {
        console.error("❌ Error creating 'customers' table:", err.message);
      } else {
        console.log("✅ Table 'customers' successfully created.");
      }
    }
  );
});

module.exports = db;