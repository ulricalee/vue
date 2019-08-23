const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
const staticFile = require('koa-static')
const session = require('koa-session2')
const cors = require('koa2-cors')
const Store = require('./store')
const proxy = require('koa-proxy2')
const bodyParser = require('koa-bodyparser')
const __production__ = false //false 本地开发

//controller
const Controller = require('./controller')

//静态资源路径
const main = staticFile(path.resolve(__dirname, '../build'))
const app = new Koa
const router = new Router

app.use(async (ctx,next)=>{
	//设置响应头
	ctx.set('Cache-Control','max-age=3600')
	await next()

	
	// console.log(ctx.response.type)
	// ctx.remove('etag')
	// ctx.etag = etag
	// ctx.vary = 'etag'

	//
	// if (ctx.fresh) {
	//     ctx.status = 304;
	// }
	// const etag = ctx.response.get('ETag');
	// console.log(etag)
	
	// console.log(ctx.body)
	// ctx.status = 20
	// ctx.set({
	//   'Etag': etag
	//   // 'Last-Modified': new Date
	// });

	// ctx.request.header={
	// 	'cache-control' : 'no-store'
	// }
	
})



!__production__ && app.use(proxy({
  	proxy_rules: [
	    {
		    proxy_location: /index|dist/,
		    proxy_pass: 'http://localhost:9000',
		    proxy_micro_service: false,
		    proxy_merge_mode: false
	    }
  	]
}))

//注册controller
Controller(router)

//日志
app.use(logger())

app.use(bodyParser())

app
	//应用静态文件
	.use(main)
	//跨域
	.use(cors(
	    {
			// origin : tx => {
			// 	return 'http://localhost:9000'
			// }
		}
	))
	//session
	.use(session({
	  	store:new Store(),
	  	key: 'SESSION',
	}))
	//添加router middleware
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(80,()=>{
    console.log('web server start')
})

// error-handling
app.on('error', (err, ctx) => {
    logger.error('server error', err, ctx)
})