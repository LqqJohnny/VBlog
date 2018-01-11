<template>
  <div id="app">
    <Header></Header>
    <!-- <Side></Side> -->
    <div id="articlecontainer"><router-view></router-view></div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/common/footer.vue"
import Header from "./components/common/header.vue"
// import Side from "./components/common/side.vue"
import 'normalize.css';


export default {
  name: 'app',
  components:{
    Header,Footer
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
img{
  box-shadow: 0px 0px 10px 3px #000000;
  display: block;
  margin: 3rem auto;
}
</style>
