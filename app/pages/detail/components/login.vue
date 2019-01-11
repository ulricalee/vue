<template>
	<div class="login">
		<input type="text" placeholder="account" v-model="account">
		<input type="password" placeholder="password" v-model="password">
		<button type="button">sign in</button>
	</div>
</template>
<script>
import Ajax from '@app/api/ajax'
import axios from 'axios'
console.log(axios)
export default {
	name: 'login',
	data(){
		return {
			account:'',
			password:''
		}
	},
	created(){
	}
}
</script>