<template>
  <div>
    <!-- 动态绑定路由动画，根据路由状态的不同绑定不同的路由动画分别为  ：‘slide-left’  和 'slide-right' -->
    <transition :name="transitionName">
      <navigation>
      <router-view class="router"></router-view>
      </navigation>
    </transition>
  	<!-- <img src="./assets/img/image008.jpg" width="30" alt="">
  	<div class="logo"></div>
  	<div class="bg"></div>
  	<div class="bg2"></div>
    <h1 class="xixi">vue</h1> -->
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
    name: 'App',
    data () {
        return {
          transitionName: 'slide-left'
        }
    },
    created () {
      // bind event
      this.$navigation.on('forward', (to, from) => {
        this.transitionName = 'slide-left'
      })
      this.$navigation.on('back', (to, from) => {
        this.transitionName = 'slide-right'
      })
      this.$navigation.on('replace', (to, from) => {
        console.log('replace to', to, 'from ', from)
      })
      this.$navigation.on('refresh', (to, from) => {
        console.log('refresh to', to, 'from ', from)
      })
      this.$navigation.on('reset', () => {
        console.log('reset')
      })
    }
}
</script>

<style>
body {
  font-family: Helvetica Neue,Helvetica,Microsoft Yahei,STHeiTi,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router {
  position: absolute;
  width: 100%;
  transition: all .8s ease;
  transform: translateZ(0);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
