<template>
	<div class="register">
		<van-cell-group>
			<van-field
			    v-model="account"
			    clearable
			    left-icon="contact"
			    label="Account"
			    autocomplete="off"
			    :error-message="accountError"
			    @focus="clearAccountError"
			/>
			<van-field
				v-model="password"
				:type="pwdType"
				label="Password"
				left-icon="setting-o"
				:icon="eye"
				@click-icon="changeEye"
				:error-message="pwdError"
				autocomplete="off"
				@focus="clearPwdError"
			/>
			<van-field
			    v-model="code"
			    left-icon="aim"
			    clearable
			    label="Code"
			    maxlength="2"
			    autocomplete="off"
			    :error-message="captchaError"
				@focus="clearCodeError"
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
			ajaxSwitch:false,
			accountError:'',
			captchaError:'',
			pwdError:'',
			pwdType:'password',
			captchaSrc:'',
			account:'',
			password:'',
			code:'',
			eye:'closed-eye' //eye-o
		}
	},
	methods:{
		clearCodeError(){
			this.captchaError = ''
		},
		clearPwdError(){
			this.pwdError = ''
		},
		clearAccountError(){
			this.accountError = ''
		},
		changeEye(){
			this.pwdType = this.pwdType === 'password' ? 'text' : 'password'
			this.eye = this.eye === 'closed-eye' ? 'eye-o' : 'closed-eye'
		},
		getCode(){
			axios.get(`${CAPTCHA}?v=${parseInt( Math.random()*1000 )}`).then(res => {
				let _data = res.data
				this.captchaSrc = 'data:image/svg+xml;base64,' + window.btoa(_data)
			}).catch(function (error) {
				console.log(error)
			})
		},
		checkForm(){
			let regxnull = /^\s*$/g
			if(regxnull.test(this.account)){
				this.accountError = 'account cannot be empty'
				return false
			}else{
				this.accountError = ''
			}
			if(regxnull.test(this.password)){
				this.pwdError = 'password cannot be empty'
				return false
			}else if(this.password.length < 8){
				this.pwdError = 'at least 8 characters'
				return false
			}else{
				this.pwdError = ''
			}
			return true
		},
		submitRegister(){
			if(!this.checkForm() || this.ajaxSwitch) return
			this.ajaxSwitch = true
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
				switch(_case){
					case 'A0000' :
						this.$notify({
							message: 'create account successfully',
						  	duration: 1500,
						  	background: 'deepskyblue'
						})
						setTimeout(()=>{
							this.$router.push({ name: 'life', params: {}})
						},1500)
						break;
					case 'A0002' :
						this.accountError = _data.msg
						this.ajaxSwitch = false
						break;
					case 'A0003' :
						this.captchaError = _data.msg
						this.ajaxSwitch = false
						break;

				}
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
		position:relative;
		width:80px;
		height:24px;
	}
	.captcha-btn img{
		width:100%;
		height:100%;
	}
	.register .van-field__button{
		font-size: 0;
    	line-height: 1;
	}
</style>
