const express = require("express");
const router = express.Router();
const db = require("./database");

// 🟢 **Save or Update Furniture Configuration**
router.put("/save/:customerID", (req, res) => {
  const { shape, material, stitching, color, image } = req.body;
  const customerID = req.params.customerID.trim();

  if (!shape || !material || !stitching || !color) {
    return res.status(400).json({ message: "❌ Missing data in the request" });
  }

  console.log("📥 Saving configuration for customer:", customerID);

  db.run(
    `INSERT INTO configurations (customerID, shape, material, stitching, color, image) 
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(customerID) DO UPDATE SET 
     shape = excluded.shape,
     material = excluded.material,
     stitching = excluded.stitching,
     color = excluded.color,
     image = excluded.image;`,
    [customerID, shape, material, stitching, color, image || null],
    function (err) {
      if (err) {
        console.error("❌ Error saving:", err.message);
        return res.status(500).json({ message: "❌ Error saving to the database" });
      }
      res.json({ message: "✅ Configuration saved!", id: this.lastID });
    }
  );
});

// 🟢 **Retrieve Furniture Configuration for a Customer**
router.get("/config/:customerID", (req, res) => {
  const customerID = req.params.customerID.trim();

  console.log("📥 Loading configuration for customer:", customerID);

  db.get(
    "SELECT shape, material, stitching, color, image FROM configurations WHERE customerID = ?",
    [customerID],
    (err, row) => {
      if (err) {
        console.error("❌ Error retrieving:", err.message);
        return res.status(500).json({ message: "❌ Error retrieving configuration" });
      }
      if (!row) {
        return res.status(404).json({ message: "⚠️ No saved configuration found" });
      }
      res.json(row);
    }
  );
});

// 🟢 **Retrieve Customer Branding Data**
router.get("/customer/:customerID", (req, res) => {
  const customerID = req.params.customerID.trim();

  console.log(`📥 Fetching branding for customer: ${customerID}`);

  db.get(
    "SELECT logo, primaryColor, backgroundColor, textColor FROM customers WHERE customerID = ?",
    [customerID],
    (err, row) => {
      if (err) {
        console.error("❌ Error retrieving customer data:", err.message);
        return res.status(500).json({ message: "❌ Error retrieving customer data" });
      }
      if (!row) {
        return res.status(404).json({ message: "⚠️ No branding data found for this customer" });
      }
      res.json(row);
    }
  );
});

// 🟢 **Test Route to Ensure API is Running**
router.get("/", (req, res) => {
  res.send("✅ API is running with SQLite! 🚀");
});

module.exports = router;