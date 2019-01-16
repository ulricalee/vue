<template>
	<div>
		<h1>life</h1>
	</div>
</template>
<script>
import axios from 'axios'
import { PLAY } from '@app/api/domain'
export default {
	name: 'life',
	data(){
		return {
			
		}
	},
	methods:{
		req(){
			axios.get(PLAY, {
				params: {
					
				}
			}).then(res => {
				console.log(res)
				
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
