const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
          as: 'user'
        },
        {
         model: Comment
       }
      ],
    });
    
    const commentData = await Comment.findAll({
      // where: {post_id: posts.id}
    })
    const comments = commentData.map((comment) =>
    comment.get({ plain: true })
    );
    const posts = postData.map((post) =>
    post.get({ plain: true })
    );
    
    

    console.log(posts)
    res.render('homepage', {
      posts,
      // comments,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
