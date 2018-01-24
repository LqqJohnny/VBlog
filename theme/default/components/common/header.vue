<template lang="html">
    <div class="header">
      <div class="siteName"> <router-link to="/">{{siteInfo.title}}</router-link> <span class="desc">{{siteInfo.description}}</span> </div>

       <ul class="header_menu ">
         <li v-for="item in menuInfo"><router-link :to="item.href">{{item.name}}</router-link></li>
       </ul>

    </div>
</template>

<script>

import {site,menu} from '../../../../blog.config.js'
export default {
  data(){
    return {
      siteInfo: site,
      menuInfo:menu
    }
  },
}
</script>

<style lang="css" scoped>
.siteName a{
  font-size: 1.5rem;
  color:#333;
  text-decoration: none;
}
.siteName a:hover{
  color:rgb(24, 122, 201);
}
.header{
    height: 3rem;
    width:100%;
    line-height: 3rem;
    font-size: 1rem;
    background-color: #f3f3f3 ;
    padding:0 2rem;
    box-shadow: 2px 2px 3px 1px #e6e6e6;
    color: rgb(115, 115, 115);
    position:fixed;
    top:0 ;
    left:0;
}
.desc{
  font-size: 0.8rem;
  color:rgb(115, 115, 115);
 margin-left: 1rem;
}

.siteName{
  display: inline-block;
}
.header_menu{
    margin: 0;
    float: right;
    margin-right: 6rem;
    height:100%;
}
.header_menu li{
  height:100%;
  list-style: none;
  margin-right: 2rem;
  cursor: pointer;
  display: inline-block;
  margin-bottom:0;
  padding: 0.3rem;
  box-sizing: border-box;
}
.header_menu li a{
  display: block;
  height: 100%;
  line-height: 2.4rem;
  border-bottom: 1px solid transparent;
  transition-property: border-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
  text-decoration: none;
  color: #666;
}
.header_menu li:hover{
  color: #333;
  background-color: rgb(235, 235, 235);
  border-bottom: 2px solid #428bca;
}
</style>
