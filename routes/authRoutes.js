const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users_model');

router.post('/register', async (req, res) => {
  const { username, password, adminKey } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  let role = 'user';
  let isApproved = false;

  if (adminKey === process.env.ADMIN_KEY) {
    role = 'admin';
    isApproved = true;
  }

  const user = await User.create({ username, password: hashed, role, isApproved });
  res.status(201).json({
    status : 201,
    message: 'Create Success',
    data: user
  });

});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) 
    return res.status(400).json({ 
      status: '400',
      message: 'Invalid user',
      data: null
    });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) 
    return res.status(401).json({
      status: '400',
      message: 'Wrong password',
      data: null
    });

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({
    status: 201,
    message: 'Login Success',
    data: token
  });
});

module.exports = router;