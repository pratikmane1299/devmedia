const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./users');
const postsRouter = require('./posts');
const profileRouter = require('./profile');
const auth = require('../../middlewares/veifyJwt');

const User = require('../../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API running...'});
});

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postsRouter);
router.use('/profile', auth, profileRouter);

router.get('/search', async (req, res) => {
  console.log(req.query);
  try {
    const response = await User.find(
      { name: { $regex: `^${req.query.searchTerm}`, $options: 'i' } },
      'name email'
    );

    res.json(response);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
