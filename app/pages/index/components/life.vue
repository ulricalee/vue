<template>
	<div>
		<h1>life</h1>
	</div>
</template>
<script>
import Ajax from '@app/api/ajax'
import axios from 'axios'
export default {
	name: 'life',
	data(){
		return {
			
		}
	},
	methods:{
		req(){
			axios.get('http://10.2.99.156:9001/act/aboutUser', {
				params: {
					account: '',
					password: '',
					utype:''
				}
			}).then(response => {
				
				
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	},
	created(){
		this.req()
	}
}
</script>
