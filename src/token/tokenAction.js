require("dotenv").config();
const jwt = require("jsonwebtoken");

const createjwt = async (payload) => {
  let key = process.env.JWT_SECRET;
  let token = null;
  try {
    token = await jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRE });
  } catch (error) {
    console.log(error);
  }
  return token;
};
module.exports = { createjwt };
