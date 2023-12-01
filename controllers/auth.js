const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        error: "Provide all credentials!",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(422).json({
        error: "You are already registered kindly login!",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 12);
    const newuser = new User({
      name,
      email,
      password: hashedpassword,
    });
    await newuser.save();
    res.status(201).json({
      name: newuser.name,
      email: newuser.email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).json({
        error: "Email not registered signup first!",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        { email: user.email, name: user.name },
        process.env.SECRET
      );
      const { _id, name, email } = user;
      return res.json({
        user: {
          _id,
          name,
          email,
        },
        token: "Bearer " + token,
      });
    } else {
      return res.status(422).json({
        error: "Email and Password does not match!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  signup,
  login,
};
