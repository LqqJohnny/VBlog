<template lang="html">
<div>
    <div class="title">文章列表</div>
    <div class="articlesList">
      <div class="article_item" v-for="a in list" ><router-link :to="genUrl(a.name)">{{genTitle(a.name)}}</router-link></div>
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

<style lang="css" scoped>
.title{
  font-size: 1rem;
  background-image: linear-gradient(to bottom,#f5f5f5 0,#e8e8e8 100%);
  background-repeat: repeat-x;
  padding:0.5rem 1rem;
}
.article_item{
  border-bottom: 1px solid #e0e0e0;
  padding: 0.8rem 2rem ;
}
.article_item a{
  text-decoration: none;
  color: #428bca;
  padding:.3rem;
}
.article_item a:hover{
  border-bottom: 2px solid rgb(18, 149, 244);
  color: #1693ff;
}

</style>
