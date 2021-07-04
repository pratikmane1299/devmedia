const express = require('express');
const { body, validationResult } = require('express-validator');
const normalizeUrl = require('normalize-url');

const Profile = require('../../models/profile');
const User = require('../../models/user');
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
      website,
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

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    return res.json(profiles);
  } catch(error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

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

router.put('/experience', 
  body('title', 'Title is required').not().isEmpty(),
  body('company', 'Company is required').not().isEmpty(),
  body('from', 'From date is required and needs to be from the past')
  .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/experience/:expId', 
  isObjectId('expId'),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience = profile.experience.filter(
        (exp) => exp.id.toString() !== req.params.expId
      );

      await profile.save();

      return res.json(profile);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.put('/education',
  body('school', 'School is required').notEmpty(),
  body('degree', 'Degree is required').notEmpty(),
  body('fieldofstudy', 'Field of study is required').notEmpty(),
  body('from', 'From date is required and needs to be from the past')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/education/:eduId',
  isObjectId('eduId'),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education = profile.education.filter(
        (edu) => edu.id.toString() !== req.params.eduId
      );

      await profile.save();

      return res.json(profile);
    } catch (error) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    await Promise.all([
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);

    res.json({ msg: 'Your account has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
