require("dotenv").config();

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "fv45De2Hcdf44WDl";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
  return token;
}

function validateToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = { createTokenForUser, validateToken };
