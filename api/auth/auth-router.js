const router = require("express").Router();
const User = require("../users/users-model");
const bcrypt = require("bcryptjs");
const { BCRYPT_ROUNDS, JWT_SECRET } = require("../secrets/secrets");
const jwt = require("jsonwebtoken");

/* 
  IMPLEMENT
  You are welcome to build additional middlewares to help with the endpoint's functionality.
  DO NOT EXCEED 2^8 ROUNDS OF HASHING!
  */
/*
    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }
  */
/* 
    2- On SUCCESSFUL registration, the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }
  */

/* 
    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".
  */

/* 
    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required" });
    }

    // Check if username exists
    const existingUser = await User.findBy({ username });
    if (existingUser) {
      return res.status(400).json({ message: "username taken" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, parseInt(BCRYPT_ROUNDS, 8));

    // Insert new user
    const newUser = await User.insert({ username, password: hash });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
  */

  /* 
    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }
  */

  /* 
    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }
  */
  /* 
    3- On FAILED login due to `username` or `password` missing from the request body,
        the response body should include a string exactly as follows: "username and password required".
  */
  /* 
    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
  try {
    const { username, password } = req.body;
    // make sure both username and password exist
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username and password required" });
    }
    // search the database for the user
    const [user] = await User.findBy({ username });
    // make sure `users` is an array and fetch the first user
    // const user = users?.length > 0 ? users[0] : null;
    // 🔹 Validate user and password
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = buildToken(user);
      res.json({ message: `welcome, ${user.username}`, token });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
});

function buildToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username,
    role_name: user.role_name,
  };
  const options = {
    expiresIn: "1d",
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
