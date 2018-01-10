<template lang="html">
<div>
    <div>主页</div>
    <div class="articlesList">
      <div v-for="a in list" ><router-link :to="genUrl(a.name)">{{genTitle(a.name)}}</router-link></div>
    </div>
</div>
</template>

<script>
var a = require('../../../articles.json');

export default {
  data(){
    return {
      list:a
    }
  },
  methods:{
    genUrl(name){
      return "/article/"+name.replace(/\.md/g,'');
    },
    genTitle(name){
      return name.replace(/\.md/g,'');
    }
  }


}
</script>

<style lang="css">
</style>
