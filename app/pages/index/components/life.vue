<template>
	<div>
		<img width="100%" src="../assets/img/waimai_banner.png" alt="">
		<img width="100%" src="/static/img2/201907113103202.png" alt="">
		<p class="ck">我要抽卡</p>
	</div>
</template>
<script>
import axios from 'axios'
import { PLAY } from '@app/api/domain'
export default {
	name: 'life',
	data(){
		return {}
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
<!-- <style lang="scss">
@function vm($px) {
	@return ($px / 750) * 100vw
}
.ck{
	width:vm(654);
	height:vm(90);
	background:red;
}
</style> -->
<style lang="scss">
@import url('../assets/css/a.css');
@import url('../assets/scss/aaa.scss');
$vm_fontsize: 75;
$vm_design: 750;
@function rem($px) {
    @return ($px / $vm_fontsize ) * 1rem;
}
body {
   	max-width: 540px;
    min-width: 320px;
}
html {
    font-size: ($vm_fontsize / $vm_design) * 100vw;

    @media screen and (max-width: 320px) {
        font-size: 42.667px;

    }
    @media screen and (min-width: 540px) {
        font-size: 72px;
    }
}

.ck{
	width:rem(654);
	height:rem(90);
	background:red;
}
</style>
<!-- <style>

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
</style> -->