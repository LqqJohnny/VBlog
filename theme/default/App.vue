<template>
  <div id="app">
    <Header></Header>
    <!-- <Side></Side> -->
    <Music v-if="musicOn" :src="musicSrc" :autoplay="autoplay" :loop="loop"></Music>
    <div id="articlecontainer">
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/common/footer.vue"
import Header from "./components/common/header.vue"
import Music from "./components/common/music.vue"
// import Side from "./components/common/side.vue"
import 'normalize.css';
import {musicOn , musicSrc ,autoplay , musicLoop} from './theme.config.js';

export default {
  name: 'app',
  data(){
    return {
      musicOn: musicOn,
      autoplay: autoplay,
      musicSrc:musicSrc,
      loop: musicLoop
    }
  },
  components:{
    Header,Footer,Music
  }
}
</script>

<style>
#articlecontainer{
  width:70%;
  margin: 5rem auto;
  border-radius: .5rem;
  box-shadow:  0px 0px 5px 2px #c7c7c7;
  padding: 0;
  overflow: hidden;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.articleInfo img{
  box-shadow: 0px 0px 10px 3px #000000;
  display: block;
  margin: 3rem auto;
  max-width:40%;
}

.articleInfo img:visited{
  width:100%;
}

.clearfix{zoom:1}
.clearfix:after{
     content:".";
     display:block;
     height:0;
     clear:both;
     visibility:hidden;

}
li{
  list-style: none;
}

</style>
