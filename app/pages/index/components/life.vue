<template>
	<div>
		<h1></h1>
		<img src="../assets/img/1.png" width="50%" alt="">
		<p>嘻嘻</p>
		<!-- <h2>1px</h2>
		<h3>2px</h3> -->
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
<style>

	@media screen and (max-width: 320px){   
	    html {   font-size:42.667px }
	}
	@media screen and (min-width: 361px) and (max-width:375px) {   
	    html {   font-size:50px }
	}
	h1{
		/*width:8.666667rem;
		height:1.2rem;*/
		margin:0 auto;
		width:6.5rem;
		height:0.9rem;
		background:#f9da6e;
		/*border:0.5px solid red;*/
	}
	h2{
		width:0.25rem;
		/*border:1px solid red;*/
	}
	h3{
		width:0.25rem;
		/*border:2px solid red;*/
	}
	body{

	}
</style>