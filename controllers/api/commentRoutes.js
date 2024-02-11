const router = require('express').Router();
const { Comment, User } = require('../../models');

// POST create a new comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            authorName: req.body.name
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{ model: User }],
        });
        console.log(commentData)
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with that id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;