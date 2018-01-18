<template lang="html">
<div class="home">
    <div class="title">文章列表</div>
    <div class="articlesList">
      <div class="article_item" v-for="a in list" ><router-link :to="genUrl(a.name)">{{genTitle(a.name)}}</router-link> <span class="date">{{getDate(a.timestamp)}}</span></div>
    </div>

    <div class="searchFrame">
      <input type="text" class="searchBar" placeholder="文章名称" v-model="searchword" @keyup.enter="search">
    </div>
</div>
</template>

<script>
var arts = require('../../../../articles.json');
const {site} = require("../../../../blog.config.js");
export default {
  data(){
    return {
      list:arts,
      searchword:""
    }
  },
  mounted(){
      document.title= site.title ;
  },
  methods:{
    genUrl(name){
      return "/article/"+name.replace(/\.md/g,'');
    },
    genTitle(name){
      return name.replace(/\.md/g,'');
    },
    getDate(time){
      var date = new Date(time);
      return date.getFullYear()+" / "+(date.getMonth()+1)+" / "+date.getDate();
    },
    search(){
      var query = this.searchword;
      if(query===""){
        this.list = arts;
      }else{
        this.list = arts.filter(function(val){
          return val.title.indexOf(query)>=0;
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.home{
  position: relative;
}
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
.article_item .date{
  float: right;
  color: rgb(115, 115, 115);
}
.searchFrame{
  position: absolute;
  top: 0.2rem;
  right:2rem;
  width:6rem;
  height:1.6rem;

}
.searchFrame .searchBar{
  display: inline-block;
  width: 100%;
  height:100%;
  padding:0 .5rem;
  border-radius: 1rem;
  border:1px solid rgb(198, 198, 198);
  font-size: .8rem;
  background-color: #fff;
  box-sizing:content-box;
}
.searchFrame:after{
  content: "";
  position: absolute;
  display: block;
  width:1rem;
  height: 1rem;
  right:-0.2rem;
  top:0.3rem;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABmklEQVQ4T4VTwXHCMBC8NaBvSAdOBSEdQAXQQUgFMQ+k4ZcfI/Gw0wElkA5MBaGDpIPkbca6zHkkYpyE+OeTtLu3ewfqfHmeD6uqmiZJksYjZn7RWh+6d+Uf7aK19gnAIzMDQPOAmYcAbomoJKJFF+gE4JwrmXkEINNab9vA6/U67fV6UhOgSRukAXDOFcw8BzAOrJkxZt6VbK3dApjWdX23Wq3emxYC+huAiRS894X3fhYvdEGcc+/MXEYCBPaxMWZkrT0opcaLxeLzN8OCWlGWa62vGwXSOxEdtNaZJHDpsTyQO8fj8UMUL5fLsgEIkp7+Yo118UCkO+ckpm+AqOASQPCqGAwG8zMFkj0R3Rtjbi4BiFcAdsycMnNhjBmepUBED938W9KFJFVKZVVVvRLR/pRCnANR0R6SYJYwCpP0XogHRDRTSqXR7NMkxiEBUPT7/ed2GpvNZszMORGNiEgiPk3jj10gogzAVZh92YUUgCzWvq7reZIksi/TCHIG0Op5Ftik9Om937UnM6oVkF8B/psHOQ9+HL4AMYHp6sjRRpAAAAAASUVORK5CYII=);
}
.searchFrame .searchBar:focus{
      outline: none;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #b9b5b5; opacity:1;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #b9b5b5;opacity:1;
}

input:-ms-input-placeholder{
    color: #b9b5b5;opacity:1;
}

input::-webkit-input-placeholder{
    color: #b9b5b5;opacity:1;
}
</style>
