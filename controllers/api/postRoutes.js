const router = require('express').Router();
const { Comment, User, Post } = require('../../models');

// POST create a new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            author_id: req.session.user_id,
            comment: req.body.comment
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{ model: Comment }, { model: User }],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;