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
    name: "user-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

//Drop table if force: true and uncommend following
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

db.sequelize.sync().then(()=>console.log("Resync DB"));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Hotel Manager (backend) application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {

  Role.create({
    id: 1,
    name: "admin"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 

}

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests