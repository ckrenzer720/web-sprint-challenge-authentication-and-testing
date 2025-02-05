const User = require("../users/users-model");
const { JWT_SECRET } = require("../secrets/secrets");
const jwt = require("jsonwebtoken");

const checkUsernameExists = async (req, res, next) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    res.status(400).json({ message: "username and password required" });
  }
  const existingUser = await User.findBy({ username }).first();
  if (existingUser) {
    return res.status(400).json({ message: "username taken" });
  }
  next();
};

const checkPayload = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }
  next();
};
function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = {
  checkUsernameExists,
  checkPayload,
  buildToken,
};
