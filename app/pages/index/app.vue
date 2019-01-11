<template>
  <div>
      <router-view></router-view>
  	<img src="./assets/img/image008.jpg" width="30" alt="">
  	<div class="logo"></div>
  	<div class="bg"></div>
  	<div class="bg2"></div>
    <h1 class="xixi">vue</h1>
  </div>
</template>

<script>
//const bar = Symbol('bar')
const bar  = 'aaa'
// [bar](opt){
//    console.log(opt)
// }
class A {
    constructor(){
        this.gname = 'lyc'
        console.log('===')
    }
    static d(){
        console.log(A.gname)
        return A.gname
    }
    dd(){
      console.log(this.gname)
    }
    b(){
        this[bar](1)
        
    }
    c(){
      console.log('~')
    }
    [bar](abc){
      console.log(abc)
       return abc
    }

}
var a = new A
A.d()
export default {
    name: 'App'
}
</script>

<style scoped>
.xixi {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.bg{
	width:50px;
	height:50px;
	background:url('./assets/img/image008.jpg') no-repeat;
}
.logo{
	width:50px;
	height:50px;
	background:url('./assets/img/logo.png') no-repeat;
	background-size:100% 100%;
}
</style>
