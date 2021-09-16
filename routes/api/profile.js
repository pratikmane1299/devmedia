const express = require('express');
const { body, validationResult } = require('express-validator');
const normalizeUrl = require('normalize-url');

const Profile = require('../../models/profile');
const User = require('../../models/user');
const Post = require('../../models/post');
const isObjectId = require('../../middlewares/isObjectId');
const { serializeProfile } = require('../../utils/serialize');

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

router.get('/developers', async (req, res) => {
  try {
    const developers = await Profile.find(
      { user: { $ne: req.user.id.toString() } },
      'location user company followers following website'
    )
      .lean()
      .populate('user', ['name', 'avatar']);

    for(let dev of developers) {
      dev = serializeProfile(dev, req.user);
    }

    return res.json(developers);
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
      let profile = await Profile.findOne({ user: userId }).populate('user', [
        'name',
        'avatar',
      ]).lean();

      if (!profile) {
        return res.status(404).json({ msg: 'Profile for the user not found' });
      }

      res.json(serializeProfile(profile, req.user, true));
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
      const profile = await Profile.findOneAndUpdate({ user: req.user.id }, {
        $push: {
          experience: {
            $each: [req.body],
            position: 0
          }
        }
      }).populate('user', 
      ['name', 'avatar',]).lean();
      
      res.json(serializeProfile(profile, req.user, true));
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
      let profile = await Profile.findOne({ user: req.user.id }, 'experience');

      profile.experience = profile.experience.filter(
        (exp) => exp.id.toString() !== req.params.expId
      );

      await profile.save();

      profile = await Profile.findOne({ user: req.user.id }).populate('user', [
        'name',
        'avatar',
      ]).lean();

      return res.json(serializeProfile(profile, req.user, true));
    } catch (error) {
      console.error(error);
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


      return profile.education;


      // const profile = await Profile.findOneAndUpdate({ user: req.user.id }, {
      //   $push: {
      //     education: {
      //       $each: [req.body],
      //       position: 0
      //     }
      //   }
      // }).populate('user', 
      // ['name', 'avatar',]).lean();

      // return res.json(serializeProfile(profile, req.user, true));
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
      let profile = await Profile.findOne({ user: req.user.id }, 'education');

      console.log(profile);

      profile.education = profile.education.filter(
        (edu) => edu.id.toString() !== req.params.eduId
      );

      await profile.save();

      profile = await Profile.findOne({ user: req.user.id }).populate('user', [
        'name',
        'avatar',
      ]).lean();

      return res.json(serializeProfile(profile, req.user, true));
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

router.delete('/', async (req, res) => {
  try {
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);

    res.json({ msg: 'Your account has been deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:userId/followUnFollowUser', async (req, res) => {
  try {

    const { userId } = req.params;
    
    const userProfile = await Profile.findOne({ user: userId });

    const viewerProfile = await Profile.findOne({user: req.user.id});

    let isAdded = false;
    
    if (!userProfile || userId === req.user.id) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    if (!viewerProfile.following.includes(userId)) {
      // viewer does not follow user

      viewerProfile.following.unshift(userId);
      userProfile.followers.unshift(viewerProfile.user._id);

      isAdded = true;
    } else {
      // viewer is already following user

      viewerProfile.following = viewerProfile.following.filter((id) => id.toString() !== userId);

      userProfile.followers = userProfile.followers.filter((id) => id.toString() !== viewerProfile.user._id.toString());

    }
    await viewerProfile.save();
    await userProfile.save();

    res.status(200).json({ isAdded });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
