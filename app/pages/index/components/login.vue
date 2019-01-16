<template>
	<div class="login">
		<van-cell-group>
		  	<van-field v-model="account" placeholder="Account" />
		  	<van-field type="password" v-model="password" placeholder="Password"/>
		</van-cell-group>
		<van-button size="large" class="in" @click="signIn">Sign In</van-button>
		<p class="alc">New to here? <span @click="goRegister">Create an account</span></p>
	</div>
</template>
<script>
import Ajax from '@app/api/ajax'
import { LOGIN } from '@app/api/domain'
import axios from 'axios'
export default {
	name: 'login',
	// compontents:{
	// 	vanfield
	// },
	data(){
		return {
			account:'',
			password:'',
			utype:'',
			tipSwitch:false
		}
	},
	methods:{
		signIn(){
			axios.get(LOGIN, {
				params: {
					account: this.account,
					password: this.password,
					utype:'login'
				}
			}).then(response => {
				let _data = response.data
				if(_data && _data.code === 'A0000'){
					if(this.utype === 'login'){
						this.$router.push({ name: 'life'})
					}
				}else{
					this.$notify('Incorrect account or password.')
				}
				
				
			})
			.catch(function (error) {
				console.log(error);
			})
		},
		goRegister(){
			this.$router.push({ name: 'register', params: {}})
		}
	},
	created(){
		console.log('this is login')
	}
}
</script>
<style lang="scss" scoped>
	.login{
		position:absolute;
		top:50%;
		left:0;
		width:100%;
		margin-top:-200px;
	}
	.in{
		background-color:cadetblue;
		color:#fff;
		margin-top:25px;
	}
	.suc{
		color:green;
	}
	.err{
		color:#ff0000;
	}
	.alc{
		text-align:center;
		font-size:12px;
	}
	.alc span{
		color:navy;
	}
</style>