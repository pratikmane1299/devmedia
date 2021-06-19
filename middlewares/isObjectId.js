const mongoose = require('mongoose');

const isObjectId = (id) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
    return res.status(400).json({ msg: 'Invalid id' })
  }
  next();
}

module.exports = isObjectId;
