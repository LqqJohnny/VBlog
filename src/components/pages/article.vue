<template lang="html">
  <div>
  <div> 文章详情页    {{$route.params.id}}</div>
  <article class="article" v-html="articleContent">

  </article>
  </div>
</template>

<script>
export default {
  data(){
    return {
      articleContent: ""
    }
  },
  mounted(){
    var id = this.$route.params.id;
    var md = require('../../articles/'+id+'.md');
    this.articleContent = md;
  }

}
</script>

<style lang="css">
</style>
