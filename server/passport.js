const passport = require('koa-passport')
// var LocalStrategy = require('passport-local').Strategy


// 序列化ctx.login()触发
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ', user)
  done(null, user.id)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function(id, done) {
  console.log('deserializeUser: ', id)
  var user = {id: 1, username: 'admin', password: '123456'}
  done(null, user)
})
// 提交数据(策略)
// passport.use(new LocalStrategy({
//   // usernameField: 'email',
//   // passwordField: 'passwd'
// }, function(username, password, done) {
//   console.log('LocalStrategy', username, password)
//   var user = {id: 1, username: username, password: password}
//   done(null, user, {msg: 'this is a test'})
//   // done(err, user, info)
// }))
const naiveStrategy = {
  name: 'local',
  // 策略的主体就是authenticate(req)函数，在成功的时候返回用户身份，失败的时候返回错误
  authenticate: function (req) {
    
    let uid = req.session.passport.user
    if (uid) {
      console.log('~~~')
    
      // 策略很简单，就是从参数里获取uid，然后组装成一个user
      let user = {id: parseInt(uid), name: 'user' + uid}
      this.success(user)
    } else {
      console.log(401)
      // 如果找不到uid参数，认为鉴权失败
      this.fail(401)
    }
  }
}
passport.use(naiveStrategy)

module.exports = passport