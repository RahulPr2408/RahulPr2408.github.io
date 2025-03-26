const jwt = require('jsonwebtoken');
const Restaurant = require('../Models/Restaurant');
const User = require('../Models/User');

const authMiddleware = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401)
        .json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let restaurant;
    if (decoded.type === 'restaurant') {
      restaurant = await Restaurant.findOne({ _id: decoded._id, email: decoded.email });
    } else {
      restaurant = await User.findOne({ _id: decoded._id, email: decoded.email });
    }

    if (!restaurant) {
      return res.status(401)
        .json({ success: false, message: 'Restaurant not found' });
    }

    req.restaurant = restaurant;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    return res.status(401)
      .header('Content-Type', 'application/json')
      .json({ 
        success: false, 
        message: error.name === 'JsonWebTokenError' ? 'Invalid token' : 'Authentication failed'
      });
  }
};

module.exports = authMiddleware;
