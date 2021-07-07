const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/veifyJwt');
const Post = require('../../models/post');

router.get('/', auth, async (req, res) => {

  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);

  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');  
  }
});

router.post('/', auth, [
  check('text', 'Text is required').not().isEmpty(),
], async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newPost = await Post.create({ text: req.body.text, user: req.user.id });

    return res.json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

module.exports = router;
