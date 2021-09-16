const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = async  (req, res, next) => {
  let token = req.get('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'Unauthenticated !!!' });
  }

  token = token.split(' ')[1];

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(data.user.id);
    next();

  } catch (error) {
    return res.status(401).json({ msg: 'Token invalid or expired' });
  }
}
