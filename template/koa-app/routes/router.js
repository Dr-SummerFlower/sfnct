import Router from 'koa-router';

const router = new Router();

router.get('/', (ctx) => {
    ctx.body = '你好, Koa Router!';
});

export default router;