const express = require('express');
const router = express.Router();

const Profile = require('../../models/profile');

router.get('/me', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ]);
  
    if (!profile) {
      return res.status(404).json({ msg: 'Profile for the user not found' });
    }
  
    return res.json(profile);
  } catch (error) {
    console.error(error.msg);
    return res.status(500).send('Internal server error');
  }
}); 

module.exports = router;
