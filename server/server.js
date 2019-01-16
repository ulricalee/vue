const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const logger = require('koa-logger')
// const cookieParser = require('cookie-parser')
const staticFile = require('koa-static')
const session = require('koa-session2')
const cors = require('koa2-cors')
const Store = require('./store')
// const passport = require('./passport')
//const passport = require('koa-passport')

//controller
const Controller = require('./controller')

//静态资源路径
const main = staticFile('../build')

const app = new Koa
const router = new Router



// app.use('*', (req, res, next) => {
//     console.log('~~~~~~')
//     console.log(req)
//     console.log('~~~~~~')
// 	// proxy.web(req, res, { target: config.target })

// })

//注册controller
Controller(router)

//日志
app.use(logger())

// app.use(async (ctx, next) => {
//     console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
//     await next(1)
// })









// app.use(passport.initialize())
// app.use(passport.session())

app
	//应用静态文件
	.use(main)
	//跨域
	.use(cors())
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