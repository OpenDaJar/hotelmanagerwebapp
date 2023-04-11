//import and initialize necessary modules and routes, listen for connections.
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

// app.use(cors());
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
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

db.sequelize.sync().then(() => {
  console.log(' Resync Db');
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requestss
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {

  Role.create({
    id: 1,
    name: "moderator"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
}