import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        message: '你好, Express Router!',
    });
});

export default router;
