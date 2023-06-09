//handle signup, signin & signout actions
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.firstUser =async()=>{
  try {
    const user = await User.create({
      username:"admin",
      email:"admin@admin.com",
      password: bcrypt.hashSync("123456", 8),
      role:"admin"
    })
    if (user) console.log("First user created");
    
  } catch (error) {
    console.log("First user signup failed:" ,error.message)
  }
}

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role,
    });

    if (user)
      res.status(200).send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const disabledAccount = user.isDisabled;

    if (disabledAccount) {
      return res.status(403).send({ message: "User account is Disabled" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      // expiresIn: 86400, // 24 hours
      expiresIn: "30d",
    });

    req.session.token = token;

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      isDisabled: user.isDisabled,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
