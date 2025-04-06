const express = require('express');
const router = express.Router();
const User = require('../models/users_model');
const jwt = require('jsonwebtoken');

// Middleware ตรวจ role admin
function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.get('/users', isAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.put('/users/:id/approve', isAdmin, async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
  res.json(user);
});

module.exports = router;