const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../../middlewares/veifyJwt');
const Post = require('../../models/post');
const Profile = require('../../models/profile');

router.get('/', auth, async (req, res) => {

  try {
    const { followers, following } = await Profile.findOne({ user: req.user.id }, 'followers following');

    const followersFollowings = followers.concat(following).map(i => i.toString());

    const posts = await Post.find({ user: { $in: [...followersFollowings, req.user.id] } })
      .populate('user', ['name', 'avatar'])
      .populate('comments.user', ['name', 'avatar'])
      .sort({ date: -1 });
    return res.json(posts);

  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');  
  }
});

router.get('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ msg: 'Post not found !!!' });

    return res.json(post);
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
    let newPost = await Post.create({ text: req.body.text, user: req.user.id });

    newPost = await newPost.populate('user', 'name avatar').execPopulate();

    return res.json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ msg: 'Post not found !!!' });

    if (post.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'Not authorized to delete post !!!' });
    }

    await Post.deleteOne({ _id: req.params.postId });

    return res.json({ _id: req.params.postId });

  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal server error');
  }
});

router.put('/:postId/likeUnLike', auth, async (req, res) => {
  try {

    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ msg: 'Post not found !!!' });

    if (post.likes.some(id => id.toString() === req.user.id)) {
      post.likes = post.likes.filter(userId => userId.toString() !== req.user.id)
    } else  {
      post.likes.push(req.user.id)
    }

    await post.save();

    return res.json({ likes: post.likes });

  } catch(error) {
    console.log(error);
    return res.status(500).send('Internal server error');
  }
});

router.post('/:postId/add-comment',
  auth, [
    check('text', 'Comment is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let post = await Post.findById(req.params.postId);

      if (!post) return res.json({ msg: 'Post not found !!!' });

      post.comments.unshift({
        user: req.user.id,
        text: req.body.text,
      });

      await post.save();

      post = await post.populate('comments.user', 'name avatar').execPopulate();

      return res.json(post.comments);

    } catch (error) {
      console.log(error);
      return res.status(500).send('Internal server error');
    }
  }
);

module.exports = router;
