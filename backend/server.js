require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173"], // ✅ Erlaubt beide Ports
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
}));
app.use(express.json());

const routes = require("./routes");
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});