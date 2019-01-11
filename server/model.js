const url = 'localhost:27017/test'
const db = require('monk')(url)

db.then(() => {
  console.log('Connected correctly to MongoDB')
}).catch(res => {
	console.log('failed to connect to MongoDB')
})



let users = db.get('user')
let award = db.get('award')

module.exports = {
	users,
	award
}