<template lang="html">
  <div class="articleInfo">
    <div class="title">{{$route.params.id}}</div>
    <hr>
    <div class="info">
      <span v-if="date">日期 :{{date}} </span>
      <span v-if="tags">标签 :{{tags}} </span>
      <span v-if="categories">分类 ： {{categories}} </span>
    </div>
    <div id="artConWrap">
      <vue-lazy-component :timeout="500" class="lazyComponent"  @after-leave="afterInit" :class="{'done' : slideStart}">
        <article class="article" id="article" v-html="articleContent" v-highlight v-if="!passErr">
        </article>

        <artContentSkt slot="skeleton"></artContentSkt>
      </vue-lazy-component>
    </div>
    <!-- 查看大图插件 -->
    <div @click="hideBigPic">
      <bigPicture v-if="showBigPic" :src="bigPicSrc" :alt="bigPicAlt" ></bigPicture>
    </div>
  </div>
</template>

<script>
import artContentSkt from "../common/artContentSkt.vue"
import bigPicture from "../common/bigPicture.vue"
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
      slideStart:false,
      showBigPic: false,
      bigPicSrc: "",
      bigPicAlt: ""
    }
  },
  methods:{
    afterInit(){
      this.slideStart = true;
    },
    hideBigPic(){
      this.showBigPic = false;
      this.bigPicSrc = "";
      this.bigPicAlt = "";
    }
  },
  components:{
    artContentSkt,bigPicture
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
    var that = this;
    var articlecontainer = document.getElementById('artConWrap');
    articlecontainer.addEventListener('click',function(e){
      if(e.target.nodeName==="IMG"){
        var src = e.target.currentSrc;
        that.showBigPic = true;
        that.bigPicSrc = src;
        that.bigPicAlt = e.target.alt;
      }
    })
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
.lazyComponent{
  max-height: 25rem;
  min-height: 25rem;
  overflow: hidden;
  transition: max-height ease 5s;
}

.lazyComponent.done{
  max-height:10000vh;
  min-height: 0;
  transition: max-height ease-in 5s;
}
</style>
