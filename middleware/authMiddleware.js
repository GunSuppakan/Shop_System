const jwt = require('jsonwebtoken');
const User = require('../models/users_model');

// ตรวจว่า user ได้ login + ได้รับการ approve
async function isApproved(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) 
    return res.status(401).json({
        status: 401,
        message: 'Missing token',
        data: null
    });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user || !user.isApproved) {
      return res.status(401).json({
        status: 401,
        message: 'User not approved',
        data: null
    });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
        status: 401,
        message: 'Invalid token',
        data: null
    });
  }
}

module.exports = { isApproved };
