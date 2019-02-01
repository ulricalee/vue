const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
const staticFile = require('koa-static')
const Router = require('koa-router')
const main = staticFile('./')


const router = new Router

router.get('index', '/index', async ctx => {
	ctx.response.type = 'text/html; charset=UTF-8'
  	ctx.body = fs.createReadStream('./test.html')
	
})


app.use(main)
app.use(router.routes())
   .use(router.allowedMethods())
// app.use(async ctx => {
//   ctx.body = 'Hello World'
// });

app.listen(3000)