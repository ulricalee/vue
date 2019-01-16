<template>
	<div class="register">
		<van-cell-group>
			<van-field
			    v-model="account"
			    required
			    clearable
			    label="Account"
			/>
			<van-field
				v-model="password"
				type="password"
				label="Password"
				required
				:icon="eye"
				@click-icon="changeEye"
			/>
			<van-field
			    v-model="code"
			    required
			    center
			    clearable
			    label="Code"
			    maxlength="2"
			>
			    <van-button 
			    	slot="button"
			    	size="small"
			    	type="default"
			    	class="captcha-btn"
			    	@click="getCode"
			   	>
			   		<img :src="captchaSrc" alt="captcha">
			    </van-button>
			</van-field>
		</van-cell-group>
		<van-button size="large" class="in" @click="submitRegister">Create an account</van-button>
	</div>
</template>
<script>
import axios from 'axios'
import { LOGIN, CAPTCHA } from '@app/api/domain'
export default {
	name: 'register',
	data(){
		return {
			captchaSrc:'',
			account:'',
			password:'',
			code:'',
			eye:'closed-eye' //eye-o
		}
	},
	methods:{
		changeEye(){
			console.log('==')
		},
		getCode(){
			axios.get(`${CAPTCHA}?v=${parseInt( Math.random()*1000 )}`).then(res => {
				let _data = res.data
				this.captchaSrc = 'data:image/svg+xml;base64,' + window.btoa(_data)
			}).catch(function (error) {
				console.log(error)
			})
		},
		submitRegister(){
			axios.get(LOGIN, {
				params: {
					account: this.account,
					password: this.password,
					utype:'register',
					captcha:this.code
				}
			}).then(response => {
				let _data = response.data
				let _case = _data && _data.code
				console.log(_case)
				switch(_case){
					case 'A0000' :
						console.log('succ')
						break;

				}
				// let _data = response.data
				// if(_data && _data.code === 'A0000'){
				// 	if(this.utype === 'login'){
				// 		this.$router.push({ name: 'life'})
				// 	}
				// }else{
				// 	this.$notify('Incorrect account or password.')
				// }
				
				
			})
			.catch(function (error) {
				console.log(error);
			})
		}
	},
	created(){
		this.getCode()
		// axios.get('http://localhost:9001/setsession')
	}
}
</script>
<style>
	.register{
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
	.captcha-btn{
		width:100px;
	}
	.captcha-btn img{
		width:100%;
		height:100%;
	}
</style>
