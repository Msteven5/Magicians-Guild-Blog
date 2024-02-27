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
          model: Comment,
          include: [{
            model: User,
            attributes: ['name'],
            as: 'user'
          }
          ]
        }
      ],
    });

    const posts = postData.map((post) =>
      post.get({ plain: true })
    );



    console.log(posts)
    res.render('homepage', {
      posts,
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

router.get('/profile', withAuth, async (req, res) => {
  // If a session exists, redirect the request to the homepage

  try {
    const userData = await User.findByPk(req.session.user_id,
      {
        include: [Post, Comment]
      })

    const user = userData.get({ plain: true })

    res.render('profile',
      {
        user,
        logged_in: req.session.logged_in
      });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/comments/:postId', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: { post_id: req.params.postId },
      include:
        {
          model: User,
          attributes: ['name'],
          as: 'user'
        }
    });

    const comments = commentData.map((comment) =>
    comment.get({plain: true}))


    console.log(comments)
    res.render('comments', {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/create-post', withAuth, async (req, res) => {
  try {
    res.render('create-post', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
