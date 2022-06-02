const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv").config();
// const htmlRoutes = require("./routes/html-routes.js");
const apiRoutes = require("./routes/api-routes.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static(path.join(__dirname, "build")));
// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

app.use(express.static("public"));

// Import routes
// app.use("/", htmlRoutes);
app.use("/api", apiRoutes);

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("error", (err) =>
  console.log(`error in mongoose connection ${err}`)
);

mongoose.connection.once("open", () => {
  console.log("mongoose connected!");
  app.listen(PORT, () => {
    console.log(`App running on: http://www.localhost:${PORT}`);
  });
});
