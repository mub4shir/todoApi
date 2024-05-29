const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const hashToken = async (token) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(token, salt);
};

module.exports = { generateToken, hashToken };
