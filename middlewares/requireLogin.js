const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.json({
      error: "User must be logged in!",
    });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SECRET, (err, payload) => {
    if (err) {
      return res.json({
        error: "Not Authorized!",
      });
    }
    const { email } = payload;
    User.findOne({ email: email }).then((user) => {
      req.user = user;
      next();
    });
  });
};
