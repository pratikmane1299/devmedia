const express = require('express');
const router = express.Router();

const User = require('../../models/user');

router.get('/me', async (req, res) => {
  const user = await User.findOne({ _id: req.user.id }, '-password');

  res.json({ user });
});

module.exports = router;
