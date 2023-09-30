import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message:'你好, Express Router!'
    });
});

export default router;