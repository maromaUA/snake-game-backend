const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

const authRouter = require("./routes/api/auth")
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/users", authRouter);
app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });
app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({ message });
  });

module.exports = app;