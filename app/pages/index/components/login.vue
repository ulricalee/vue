<template>
	<div class="login">
		<input type="text" placeholder="account" v-model="account">
		<input type="password" placeholder="password" v-model="password">
		<button type="button" @click="signIn">sign in</button>
		<button type="button" @click="signUp">sign up</button>
		<p :class="color">{{msg}}</p>
	</div>
</template>
<script>
import Ajax from '@app/api/ajax'
import axios from 'axios'
export default {
	name: 'login',
	data(){
		return {
			account:'',
			password:'',
			msg:'',
			utype:'',
			color:''
		}
	},
	methods:{
		req(){
			axios.get('http://10.2.99.156:9001/act/aboutUser', {
				params: {
					account: this.account,
					password: this.password,
					utype:this.utype
				}
			}).then(response => {
				let _data = response.data
				if(_data && _data.result === 'success'){
					this.color = 'suc'
					if(this.utype === 'login'){
						this.$router.push({ name: 'life'})
					}
				}else{
					this.color = 'err'
				}
				this.msg =  _data && _data.msg ? _data.msg : ''
				
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		signIn(){
			this.utype = 'login'
			this.req()
		},
		signUp(){
			this.utype = 'register'
			this.req()
		}
	},
	created(){
		console.log('this is login')
	}
}
</script>
<style scoped>
	.suc{
		color:green;
	}
	.err{
		color:#ff0000;
	}
</style>