const router = require('express').Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('./authValidations');

const env = require('../config/envioroment');

router.post('/register', async (req, res) => {
  //Validate the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //Validate the email is alredy exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ error: 'Email alredy exists' })

  //Jasj password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    admin: req.body.admin || false,
  });

  //Try save the new user
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post('/login', async (req, res) => {
  //Validate the data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Validate the email is alredy exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email doesnt exists');

  //check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  //Create web token
  const token = jwt.sign({ _id: user._id }, env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
