const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
    if (err) {
      res.json({ err: err });
    }
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.json({ nessage: 'User added successfully' });
      })
      .catch((err) => {
        res.json({ nessage: 'An Error occured' });
      });
  });
};

const login = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ $or: [{ email: username }, { phone: username }] }).then(
    (user) => {
      console.log('user', user);
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            res.json({ error: err });
          }
          if (result) {
            let token = jwt.sign(
              { name: user.name },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
              }
            );
            let refreshToken = jwt.sign(
              { name: user.name },
              process.env.REFRESH_TOKEN_SECRET,
              {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
              }
            );
            res.json({ message: 'Login success', token, refreshToken });
          } else {
            res.json({ message: 'Password does not match' });
          }
        });
      } else {
        res.json({ message: 'No user found!' });
      }
    }
  );
};

const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(400).json({ err });
    } else {
      let token = jwt.sign(
        { name: decoded.name },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
        }
      );
      let refreshToken = req.body.refreshToken;
      res
        .status(200)
        .json({ message: 'Token refresh successfully', token, refreshToken });
    }
  });
};

module.exports = { register, login, refreshToken };
