const express = require('express');
const { body, validationResult } = require('express-validator');
const normalizeUrl = require('normalize-url');

const Profile = require('../../models/profile');
const isObjectId = require('../../middlewares/isObjectId');

const router = express.Router();

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

router.post('/',
  body('status', 'Status is required').not().isEmpty(),
  body('skills', 'Skills is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      website,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
      ...rest
    } = req.body;

    let profileBody = {
      user: req.user.id,
      skills: skills.split(',').map(skill => skill.trim()),
      ...rest
    };

    social = { youtube, twitter, instagram, facebook, linkedin };
    for (const [key, value] of Object.entries(social)) {
      if (value && value.length > 0)
        social[key] = normalizeUrl(value, { forceHttps: true });
    }

    profileBody.social = social;

    try {
      let profile = await Profile.findOneAndUpdate({ user: req.user.id },
        { $set: profileBody },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );

      res.json(profile);
    } catch(error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
);

router.get('/:userId', 
  isObjectId('userId'),
  async (req, res) => {
    const { userId } = req.params;

    try {
      const profile = await Profile.findOne({ user: userId }).populate('user', [
        'name',
        'avatar',
      ]);

      if (!profile) {
        return res.status(404).json({ msg: 'Profile for the user not found' });
      }

      res.json(profile);
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal server error');
    }
  }
);

module.exports = router;
