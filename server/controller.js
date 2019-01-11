const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
const Store = require('./store')
const model = require('./model')
const passport = require('./passport')

let store = new Store()


module.exports = function(router){


	// router.get('/xixi/*', (ctx, next) => {
	//   ctx.body = ctx.isAuthenticated()
	//   //  if(ctx.isAuthenticated()) {
	//   //    next()
	//   //  } else {
	//   //   ctx.status = 401
	//   //   ctx.body = {
	//   //     msg: 'auth fail'
	//   //   }
	//   // }
	// })

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

	router.get('/api/*', async (ctx,next) => {

		if(ctx.session.user && ctx.session.user === ctx.cookies.get('user')){
			await next()
		}else{
			ctx.redirect(router.url('index'))
			// ctx.body = {
			// 	code:10000,
	  // 			result:'error',
	  // 			msg:'Account not landed.'
	  // 		}
		}

	})


	//app index 首页
	router.get('index', '/index', async ctx => {
		ctx.response.type = 'text/html; charset=UTF-8'
	  	ctx.body = fs.createReadStream('../build/index.html')
		
	})


	router.get('/act/aboutUser', async ctx => {

		let _query = ctx.query,
			_type = _query.utype,
			_account = _query.account,
			_password = _query.password,
			_existedAccount = 0 //是否存在用户 1:存在 0:不存在

		if(	!_type || !_account || !_password ){
			ctx.body = {
	  			result:'error',
	  			msg:`Request parameter missing ${!_type ? 'utype' : !_account ? 'account' : !_password ? 'password' : ''}.`
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
			  			msg:'Account already exists.'
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
				  			msg:'Login successfully.'
				  		}
				  		ctx.session.user = _account
				  		ctx.cookies.set('user', _account, {
				  			domain:'10.2.99.156',
				  			maxAge:1000*60*60*24,//24小时
				  			expires:new Date,
				  			httpOnly:false,
				  			overwrite:false
				  		})
					}else{
						ctx.body = {
				  			result:'error',
				  			msg:'Account password error.'
				  		}
					}

		  		}
		  		
		  		close()
		  	}
		  		
		  	
		}).then((res) => {

			//查找数据库user表的所有数据之后
			if(_existedAccount === 0){

				//注册用户
		  		if(_type === 'register'){
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
			  			msg:'Create account successfully.'
			  		}

		  		}else{

		  			ctx.body = {
			  			result:'error',
			  			msg:'Account does not exist.'
			  		}

		  		}


			}

		})
		

	})


	router.get('/api/clearsession', async ctx => {
		ctx.session.refresh()
	})

	router.get('/api/setsession', async ctx => {

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
	router.get('/api/getsession', async ctx => {
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