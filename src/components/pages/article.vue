<template lang="html">
  <div class="articleInfo">
  <div class="title">{{$route.params.id}}</div>
  <article class="article" v-html="articleContent" v-highlight>

  </article>
  </div>
</template>

<script>
import "../../../static/sakura.css"
export default {
  data(){
    return {
      articleContent: ""
    }
  },
  mounted(){
    var id = this.$route.params.id;
    var md = require('../../articles/'+id+'.md');
    var start = md.indexOf('<!-- deleteAbove -->');
    if(start>0){
      md = md.substring(start+"<!-- deleteAbove -->".length);
    }
    this.articleContent = md;
  }
}
</script>

<style lang="css" scoped>
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
