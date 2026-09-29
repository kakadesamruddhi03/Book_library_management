const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();


/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());


/* =========================
   ROUTES
========================= */

app.use("/api", userRoutes);

app.use("/api", bookRoutes);


/* =========================
   MONGODB
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB connected successfully"
    );

  })
  .catch((error) => {

    console.log(
      "MongoDB connection error:",
      error.message
    );

  });


/* =========================
   TEST
========================= */

app.get("/", (req, res) => {

  res.send(
    "Book Library Backend is running"
  );

});


/* =========================
   SERVER
========================= */

const PORT =
  process.env.PORT || 5000;


app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});