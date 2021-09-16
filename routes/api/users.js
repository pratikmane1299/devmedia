const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/veifyJwt');
const Post = require('../../models/post');

router.get('/', (req, res) => {
  res.json({ message: 'Users route'})
});

router.get('/:userId/posts', auth, async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ user: userId })
      .populate('user', ['name', 'avatar'])
      .sort({ date: -1 });

    return res.json(posts);

  } catch(error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
});

module.exports = router;
