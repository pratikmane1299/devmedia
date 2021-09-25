const express = require('express');
const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const normalizeUrl = require('normalize-url');

const auth = require('../../middlewares/veifyJwt');
const User = require('../../models/user');
const Profile = require('../../models/profile');

const { serializeUser, serializeProfile } = require('../../utils/serialize');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const user = await Profile.findOne(
      { user: req.user.id },
      'bio website followers following'
    ).lean().populate('user', ['name', 'avatar']);

    res.json(serializeUser(user));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Inter server error');
  }
});

router.get('/my-following', auth, async (req, res) => {
  try {

    const me = await Profile.findOne({ user: req.user.id}, {following: {$slice: [0,8]}});

    const myFollowing = await Profile.find(
      { user: { $in: me.following } },
      'id followers'
    )
      .populate('user', ['name', 'avatar'])
      .lean();

      for(let profile of myFollowing) {
        profile = serializeProfile(profile, req.user);
      }

    return res.json(myFollowing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal server error');
  }
});

router.post('/register', 
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'The password must be 8+ chars long').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'Email is already taken' }] });
      }

      const avatar = normalizeUrl(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "retro",
        }),
        { forceHttps: true }
      );

      const newUser = await User.create({ name, email, password, avatar });

      await Profile.create({ user: newUser._id });

      const token = jwt.sign({ user: { id: newUser.id }}, process.env.JWT_SECRET, { expiresIn: 3600 });

      res.status(200).json({ token });

    } catch(error) {
      console.error(error);
      return res.status(500).send('Internal server errror');
    }
  },
);

router.post('/login', 
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Email not found' }] });
      }

      const isValid = await user.comparePasswords(password)
      if (!isValid) {
        return res.status(400).json({ errors: [{ msg: 'Incorrect password' }] });
      }

      const token = jwt.sign({ user: { id: user.id }}, process.env.JWT_SECRET, { expiresIn: 3600 });

      res.status(200).json({ token });

    } catch(error) {
      console.error(error);
      return res.status(500).send('Internal server errror');
    }
  }
);

module.exports = router;
