const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretToken = process.env.SECRET_TOKEN
const createSecretToken = async (id) => {
    return jwt.sign({ id }, secretToken, {
      expiresIn: "30d",
    });
  };

const destroySecretToken = async () => {
   jwt.sign({ id }, secretToken, {
    expiresIn: "0d", // Set expiration to zero days
  });
}
exports.jwtVerify = async (req,res) => {
const token = req.headers.authorization;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, secretToken, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
}

exports.createUser = async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.json({ message: "User already exists" });
      }
      const user = await User.create({ email, password, username });
      const token = await createSecretToken(user._id);
      res.status(201).json({
        message: "User signed in successfully",
        success: true,
        user,
        token: token,
      });
      //next();
    } catch (error) {
      console.error(error);
    }
  }

  exports.loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ message: "All fields are required" });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ message: "Incorrect password or email" });
      }
      const auth = await bcrypt.compare(password, user.password);
      if (!auth) {
        return res.json({ message: "Incorrect password or email" });
      }
      const token = await createSecretToken(user._id);
  
      res.status(201).json({
        message: "User logged in successfully",
        success: true,
        token: token,
      });
    } catch (error) {
      console.error(error);
    }
  }

  exports.logout = async (req, res, next) => {
    try {
      res.send("Logged out successfully")
    } catch (error) {
      console.error(error);
    }
  }