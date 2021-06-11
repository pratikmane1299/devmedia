const express = require('express');

const authRouter = require('./auth');
const userRouter = require('./users');
const postsRouter = require('./posts');
const profileRouter = require('./profile');
const auth = require('../../middlewares/veifyJwt');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API running...'});
});

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postsRouter);
router.use('/profile', auth, profileRouter);

module.exports = router;
