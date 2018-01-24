<template lang="html">
  <div class="articleInfo">
  <div class="title">{{$route.params.id}}</div>
  <hr>
  <div class="info">
    <span v-if="date">日期 :{{date}} </span>
    <span v-if="tags">标签 :{{tags}} </span>
    <span v-if="categories">分类 ： {{categories}} </span>
   </div>
  <vue-lazy-component>
    <article class="article" v-html="articleContent" v-highlight v-if="!passErr">
    </article>

    <artContentSkt slot="skeleton"></artContentSkt>
  </vue-lazy-component>
  </div>
</template>

<script>
import artContentSkt from "../common/artContentSkt.vue"
var articles = require('../../../../articles.json');
import { passwordOn } from '../../../../blog.config.js';
import "../../../../static/sakura.css"
export default {
  data(){
    return {
      passwordOn: passwordOn,
      articleContent: "",
      date:"",
      tags:"",
      categories:"",
      password:"",
      passErr:false,
    }
  },
  components:{
    artContentSkt
  },
  beforeMount(){
    var id = this.$route.params.id;
    var _this = this;
    articles.map(function(val){
      if(val.title.trim() === id){
        _this.date = val.date ;
        _this.tags = val.tags ;
        _this.categories = val.categories ;
        _this.password=val.password;
      }
    })
    if(passwordOn && typeof(_this.password)!="undefined" && this.password!=""){
      if (prompt('请输入文章密码') !== this.password ){
          this.passErr=true;
          alert('密码错误,您无法查看此文章');
          history.back();
      }
    }
  },
  mounted(){

    var id = this.$route.params.id;

    document.title= id;  //  设置标题

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
