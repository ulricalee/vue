<template>
	<div class="login">
		<van-cell-group>
		  	<van-field v-model="account" placeholder="Account" autocomplete="off" />
		  	<van-field type="password" v-model="password" placeholder="Password" autocomplete="off"/>
		</van-cell-group>
		<van-button size="large" class="in" @click="signIn">Sign In</van-button>
		<p class="alc">New to here? <span @click="goRegister">Create an account</span></p>
	</div>
</template>
<script>
import { fetchPost } from '@app/api/ajax'
import { LOGIN } from '@app/api/domain'
export default {
	name: 'login',
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
			fetchPost(LOGIN,{
				account: this.account,
				password: this.password,
				utype:'login'
			}).then(response => {
				let _data = response.data
				if(_data && _data.code === 'A0000'){
					this.$notify({
						message: 'login successfully',
					  	duration: 1500,
					  	background: 'mediumseagreen'
					})
					setTimeout(()=>{
						this.$router.push({ name: 'life', params: {}})
					},1500)
				}else{
					this.$notify('Incorrect account or password')
				}
			})
			.catch(err => {
				this.$notify('Network request failed')
				console.log(err)
			})
		},
		goRegister(){
			this.$router.push({ name: 'register', params: {}})
		}
	},
	created(){
		console.log('====')
		console.log('this is login')
var singleNumber = function(nums) {
  return nums.reduce((before, now) => {
	  console.log(before^now)
	  return before^now
  })
};
singleNumber([1,2,2])

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