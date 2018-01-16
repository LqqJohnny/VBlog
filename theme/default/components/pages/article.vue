<template lang="html">
  <div class="articleInfo">
  <div class="title">{{$route.params.id}}</div>
  <hr>
  <div class="info">
    <span v-if="date">日期 :{{date}} </span>
    <span v-if="tags">标签 :{{tags}} </span>
    <span v-if="categories">分类 ： {{categories}} </span>
   </div>
  <article class="article" v-html="articleContent" v-highlight>

  </article>
  </div>
</template>

<script>
var articles = require('../../../../articles.json');
import "../../../../static/sakura.css"
export default {
  data(){
    return {
      articleContent: "",
      date:"",
      tags:"",
      categories:""
    }
  },
  mounted(){

    var id = this.$route.params.id;

    document.title= id;  //  设置标题

    var _this = this;
    articles.map(function(val){
      console.log(val);
      if(val.title.trim() === id){
        _this.date = val.date ;
        _this.tags = val.tags ;
        _this.categories = val.categories ;
      }
    })


    var md = require('../../../../articles/'+id+'.md');
    var start = md.indexOf('<!-- deleteAbove -->');
    if(start>0){
      md = md.substring(start+"<!-- deleteAbove -->".length);
    }
    this.articleContent = md;
  }
}
</script>

<style lang="css" scoped>
.info{
  height:5rem;
}
.info span{
  margin-right: 6rem;

  color: #989898;
}
.articleInfo{
  padding: 1rem 2rem;
}
.title{
  font-weight: bold;
  font-size: 2rem;
}
.article p:nth-of-type(0){
  display: none;
}

</style>
