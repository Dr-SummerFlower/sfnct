import express from 'express';
import config from './config.js';
import cors from 'cors';

import router from './routes/router.js';

const { ip, port } = config;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({
        message: '你好, Express!',
    });
});

app.use('/router', router);

app.listen(port, ip, () => {
    console.log(`服务器运行在端口 ${port}`);
});
