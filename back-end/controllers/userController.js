const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { users } = require("../models");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let mypassword = password;
    let userFound = await users.findOne({
      where: {
        email,
      },
    });
    if (userFound) {
      return res.status(409).json({ error: "user already exists :)" });
    } else {
      try {
        console.log(typeof salt);
        const password = await bcrypt.hash(mypassword, +process.env.SALT);
        await users.create({ name, email, password, role });
        return res.status(200).json("user registered successfully");
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userFound = await users.findOne({ where: { email } });
    // res.json(userFound);
    if (userFound) {
      const passwordMatch = await bcrypt.compare(password, userFound.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "wrong password :(" });
      }
      const token = jwt.sign(
        {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
          role: userFound.role,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "10h",
        }
      );
      return res.status(200).json(token);
    } else {
      res.status(404).json({ error: "user is not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllUsers = async (req, res) => {
  const query = req.query;
  limit = query.limit || 10;
  page = query.page || 1;
  offset = (page - 1) * limit;
  try {
    const myusers = await users.findAll({ limit, offset });
    return res.json(myusers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const myusers = await users.findOne({
      where: { id },
      include: "posts",
    });
    return res.json(myusers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
module.exports = {
  register,
  login,
  getAllUsers,
  getUser,
};
