import Koa from 'koa';
import Router from 'koa-router';
import cors from 'koa-cors';
import config from './config.js';
import router from './routes/router.js';

const { ip, port } = config;

const app = new Koa();
const appRouter = new Router();

app.use(cors());

appRouter.get('/', (ctx) => {
    ctx.body = '你好, Koa!';
});

appRouter.use('/router', router.routes());

app.use(appRouter.routes());

app.listen(port, ip, () => {
    console.log(`服务器运行在端口 ${port}`);
});
