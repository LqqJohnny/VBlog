<template lang="html">
    <div class="header">
      <div class="siteName"> {{siteInfo.title}}  <span class="desc">{{siteInfo.description}}</span> </div>
    </div>
</template>

<script>
import {site} from '../../../blog.config.js'
export default {
  data(){
    return {
      siteInfo: site
    }
  },
}
</script>

<style lang="css" scoped>
.siteName{
  font-size: 1.5rem;
  color:#333;
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
</style>
