import express from 'express';
import expressArtTemplate from 'express-art-template';
import url from 'url';
import path from 'path';
import cors from 'cors';
import config from './config.js';

import router from './routes/router.js';

const { ip, port } = config;

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine('html', expressArtTemplate);
app.set('views',path.join(__dirname, 'view'));
app.set('view engine', 'html');
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {
        message: '你好， Express!'
    });
});

app.use('/router', router)

app.listen(port, ip, () => {
    console.log(`服务器运行在端口 ${port}`);
});