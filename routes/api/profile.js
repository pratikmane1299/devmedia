const express = require('express');
const { body, validationResult } = require('express-validator');

const Profile = require('../../models/profile');

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
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    let profileBody = {};
    profileBody.user = req.user.id;
    profileBody.status = status;
    profileBody.skills = skills.split(',').map(skill => skill.trim());
    if (company) profileBody.company = company;
    if (website) profileBody.website = website;
    if (location) profileBody.location = location;
    if (bio) profileBody.bio = bio;
    if (githubusername) profileBody.githubusername = githubusername;

    profileBody.social = {};
    if (youtube) profileBody.social.youtube = youtube;
    if (twitter) profileBody.social.twitter = twitter;
    if (facebook) profileBody.social.facebook = facebook;
    if (instagram) profileBody.social.instagram = instagram;
    if (linkedin) profileBody.social.linkedin = linkedin;

    try {

      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileBody },
          { new: true }
        );
      } else {
        profile = await Profile.create(profileBody);
      }

      res.json(profile);
    } catch(error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  }
);

module.exports = router;
