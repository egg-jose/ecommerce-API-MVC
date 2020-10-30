const jwt = require('jsonwebtoken');
const env = require('../config/envioroment');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, env.TOKEN_SECRET);
    req.user = verified;
    const user = await User.findById(req.user);
    req.admin = user.admin;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
