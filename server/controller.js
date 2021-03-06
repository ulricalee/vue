const path = require('path')
const fs = require('fs')
const gm = require('gm').subClass({imageMagick: true})
const crypto = require('crypto')

const Store = require('./store')
const model = require('./model')
//验证码
const captcha = require('svg-captcha')

// const httpProxy = require('http-proxy')
// const proxy = httpProxy.createProxyServer({})

let store = new Store()


module.exports = function(router){
	
	// router.get('/xixi', (ctx, next) => {


	// 	ctx.body = 123



	// 	// ctx.body = ctx.isAuthenticated()
	//   //  if(ctx.isAuthenticated()) {
	//   //    next()
	//   //  } else {
	//   //   ctx.status = 401
	//   //   ctx.body = {
	//   //     msg: 'auth fail'
	//   //   }
	//   // }
	// })


	// router.get('/login', ctx => {
	//   // 会调用策略
	//   return passport.authenticate('local',
	//     function(err, user, info, status) {
	//       ctx.body = {user, err, info, status}
	//       return ctx.login({id: 1, username: 'admin', password: '123456'})
	//     })(ctx)
	// })
	// 图片
	router.get('/api/images', async ctx => {
		let originWidth = 0
		let date = new Date()
		let year = date.getFullYear()
		let month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1
		let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
		let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
		let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
		gm('/Users/yingchaoli/Documents/myself/Test2/static/img/waimai_banner.png')
		  .size( (err, size) => {
			originWidth = size.width
		    console.log(size)
		  })
		  .resize('50%')
		  .write(`/Users/yingchaoli/Documents/myself/Test2/static/img2/${year + '' + month + '' + day + '' + hour + '' + minute + '' + second}.png`, err => {
			console.log(err)
			if (!err) console.log('done')
		  })
		ctx.body = '456888'
	})
	

	//app index 首页
	router.get('index', '/index', async ctx => {
		let a = ctx.cookies.get('account')
		console.log('@@@@'+a)
		console.log(__dirname)
		console.log(path.resolve(__dirname, '../build/index.html'))
		// ctx.cookies.set('user', 'lyc', {
  // 			domain:'localhost',
  // 			maxAge:1000*60*60*24,//24小时
  // 			expires:new Date().getTime()+1000*60*60*24,
  // 			httpOnly:true,
  // 			overwrite:false
  // 		})
		ctx.response.type = 'text/html; charset=UTF-8'
	  	ctx.body = fs.createReadStream(path.resolve(__dirname, '../build/index.html'))
	})
	// //app detail 首页
	router.get('detail', '/detail', async ctx => {
		ctx.response.type = 'text/html; charset=UTF-8'
	  	ctx.body = fs.createReadStream(path.resolve(__dirname, '../build/detail.html'))
		
	})

	router.get('/api/*', async (ctx,next) => {
		let _clientCookie = ctx.cookies.get('_user')

		let _errObj = {
  			result:'error',
  			code:'B0001',
  			msg:'Account not logged in'
  		}


		if(_clientCookie){
			await model['users'].findOne({'account': _clientCookie}).then( async doc => {
				if(doc.password === await store.get('userpwd')){
					await next()
				}else{
					ctx.body = _errObj
				}
			})
			
			// let _redisAccount = await store.get('account')
			// if(_clientCookie === _redisAccount){
			// 	await next()
			// }else{
			// 	ctx.body = _errObj
			// }
		}else{
			ctx.body = _errObj
		}
	})

	//验证码
	router.get('/act/captcha', async ctx => {
		const cap = captcha.createMathExpr()
		store.set(cap.text,{
			sid : 'captcha'
		})
		ctx.body = cap.data
	})

	//登录、注册
	router.post('/act/aboutUser', async ctx => {
		let _query = ctx.request.body,
			_type = _query.utype,
			_account = _query.account,
			_password = _query.password,
			_captcha = _query.captcha,
			_existedAccount = 0 //是否存在用户 1:存在 0:不存在
		if(	!_type || !_account || !_password ){
			ctx.body = {
	  			result:'error',
	  			code:'A0001',
	  			msg:`request parameter missing ${!_type ? 'utype' : !_account ? 'account' : !_password ? 'password' : ''}`
	  		}
	  		return false
		}

		//先查找数据库 判断是否存在当前用户
		await model['users'].find({}).each((user, {close, pause, resume}) => {
		  	// the users are streaming here
		  	// call `close()` to stop the stream
		  	if(user.account === _account){
		  		_existedAccount = 1

		  		//注册用户
		  		if(_type === 'register'){
		  			ctx.body = {
			  			result:'error',
			  			code:'A0002',
			  			msg:'account already exists'
			  		}
		  		}
		  		//登录用户
		  		else{

		  			//从数据表里拿到盐值
		  			let _curSalt = user.salt
		  			let saltPassword = _password + ':' + _curSalt
					let clientPwd = crypto.createHash('md5').update( saltPassword ).digest('hex')

					if(clientPwd === user.password){
						ctx.body = {
				  			result:'success',
				  			code:'A0000',
				  			msg:'login successfully'
				  		}
				  		store.set(clientPwd,{
							sid : 'userpwd'
						})
				  		// ctx.session.user = _account
				  		ctx.cookies.set('_user', _account, {
				  			domain:'lyc.com',
				  			maxAge:1000*60*60*24,//24小时
				  			expires:new Date().getTime()+1000*60*60*24,
				  			httpOnly:false,
				  			overwrite:false
				  		})
					}else{
						ctx.body = {
				  			result:'error',
				  			code:'A0001',
				  			msg:'account password error'
				  		}
					}

		  		}
		  		
		  		close()
		  	}
		  		
		  	
		}).then(async res => {

			//查找数据库user表的所有数据之后
			if(_existedAccount === 0){

				//注册用户
		  		if(_type === 'register'){
		  			let _redisAccount = await store.get('captcha') 
		  			console.log( _redisAccount)
		  			if(_captcha != _redisAccount){
		  				ctx.body = {
				  			result:'error',
				  			code:'A0003',
				  			msg:'captcha error'
				  		}
		  				return
		  			}

					//对密码进行md5加密 并且 添加随机盐值
					let _salt = Math.random().toString().slice(2, 5)
					let _DBpassword = crypto.createHash('md5').update( _password + ':' + _salt ).digest('hex')

			  		model['users'].insert({
			  			account: _account,
			  			password: _DBpassword,
			  			salt: _salt
			  		})

			  		ctx.body = {
			  			result:'success',
			  			code:'A0000',
			  			msg:'create account successfully'
			  		}

		  		}else{

		  			ctx.body = {
			  			result:'error',
			  			code:'A0001',
			  			msg:'account does not exist'
			  		}

		  		}


			}

		})
		

	})


	router.get('/clearsession', async ctx => {
		ctx.session.refresh()
	})

	router.get('/setsession', async ctx => {

		ctx.session.user = 'wo shi session'


		let _str = JSON.stringify({ userName:'Daming'+Math.random(), 'age':18 })

		store.set(_str,{
			sid : 'xixi'
		})


		ctx.body = _str
	   //  ctx.response.type = 'text/html; charset=UTF-8'
	  	// ctx.body = fs.createReadStream('../build/index.html')
	   //  req.connection.remoteAddress ||
    // req.socket.remoteAddress ||
    // req.connection.socket.remoteAddress;
	    // ctx.response.type = 'html'
  		//ctx.body = fs.createReadStream('../build/index.html')
	    //ctx.body = '<h1>123</h1>'


	 //    fs.readFile('../build/index.html','utf-8',(err,data) => {
	 //    	console.log( typeof data)
		// 	if(err){
		// 		throw err 
		// 	}
		// 	ctx.body = '123'
		// })
	})
	router.get('/getsession', async ctx => {
	   //  ctx.response.type = 'text/html; charset=UTF-8'
	  //ctx.body = JSON.stringify(ctx.session)

	 let _redis = await store.get('xixi') 

	 ctx.body = `${_redis}

			<br>

			${JSON.stringify(ctx.session)}

	 `
	   //  req.connection.remoteAddress ||
    // req.socket.remoteAddress ||
    // req.connection.socket.remoteAddress;
	    // ctx.response.type = 'html'
  		//ctx.body = fs.createReadStream('../build/index.html')
	    //ctx.body = '<h1>123</h1>'


	 //    fs.readFile('../build/index.html','utf-8',(err,data) => {
	 //    	console.log( typeof data)
		// 	if(err){
		// 		throw err 
		// 	}
		// 	ctx.body = '123'
		// })
	})


	router.get('/api/ranking/:name', async ctx => {

		let a = await model['users'].find({}, 'name')
	    let name = ctx.params.name
	    ctx.response.type = 'application/json'
	    ctx.body = a
	})

	router.get('/api/play', async ctx => {

		let AWARD = model['award']

		let region = await AWARD.find({})

		let _ran = Math.ceil( Math.random()*1000 ) 

		let selected = region.find(item => _ran > item.data[0] && _ran < item.data[1] )


		if(selected && selected.store > 0 ){

			let _newregion = { ...selected }

			_newregion.store = selected.store - 1

			await AWARD.update(selected,_newregion)

			ctx.body = `<p>${Math.ceil( _ran ) }-----${selected.level}等奖</p>

				<br>

			`

		}else{
			ctx.body = `<p>${Math.ceil( _ran ) }-----未中奖</p>`
		}

	})

}