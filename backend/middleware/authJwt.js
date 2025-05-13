const jwt = require('jsonwebtoken');
require('dotenv').config();
const models = require("../models");

// verify JWT token and extract userId
const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};



// check if the user role == Admin
const isAdmin = (req, res, next) => {
  if (req.userRole && req.userRole.toLowerCase() === 'admin') {
    return next();
  }
  return res.status(403).send({ message: "Require Admin Role!" });
};


module.exports = {
  verifyToken,
  isAdmin
};
