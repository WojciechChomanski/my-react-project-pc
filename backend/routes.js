const express = require("express");
const router = express.Router();
const fs = require("fs");

// Load the data from the config.json file
const configData = JSON.parse(fs.readFileSync("config.json", "utf8"));

// Rute for all customers
router.get("/customer/:id", (req, res) => {
    const customerID = req.params.id; // String stays as a string
    const customer = configData.find((c) => c.id.toString() === customerID); // compare the id from the request with the id from the config.json file

    if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
});

// Test route for the API
router.get("/", (req, res) => {
    res.send("API is running! 🚀");
});

module.exports = router;
