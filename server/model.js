const url = '127.0.0.1:27017/test'
const db = require('monk')(url)

db.then(() => {
  console.log('Connected correctly to MongoDB')
}).catch(res => {
	console.log('failed to connect to MongoDB')
	console.log('====')
	console.log(res)
})



let users = db.get('user')
let award = db.get('award')

module.exports = {
	users,
	award
}