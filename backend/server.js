//import and initialize necessary modules and routes, listen for connections.
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8081"],
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "test-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

const db = require("./app/models");
const firstRun = require("./app/controllers/auth.controller");

//Resync DB
db.sequelize
    // force=true to drop and resync
  // .sync({ force: true })
  // .then(()=>{
  //   console.log("First run");
  //   firstRun.firstUser()
  // })
    //sync  normaly
  .sync()
  .then(() => {
    console.log(" Resync Db!");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to backend application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/booking.routes")(app);
require("dotenv").config();

// set port, listen for requestss
// const PORT = process.env.PORT || 8080;
const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
