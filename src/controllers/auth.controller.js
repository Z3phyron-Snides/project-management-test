const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await db.User.create({ name, email, password });

    const token = jwt.sign({ id: user.id }, 'hhhahahahah', {
      expiresIn: 86400, // 24 hours
    });

    res.status(201).send({ message: "User registered successfully!", token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ message: "User Not Found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, 'hhhahahahah', {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
