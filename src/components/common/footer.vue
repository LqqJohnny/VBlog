<template lang="html">
<div>
    <div class="footer">
      {{site.author}} |  <a :href="footer.url">Github</a>  | {{site.email}}
    </div>
</div>

</template>

<script>
import {site,footer} from '../../../blog.config.js'
export default {
  data(){
    return {
      footer: footer,
      site: site
    }
  },
}
</script>

<style lang="css" scoped>
.footer{
    text-align: center;
    font-size:1rem;
    width:100%;
    height: 3rem;
    line-height: 3rem;
    background-color: #f3f3f3;
    box-shadow: 0px -1px 1px 1px #e6e6e6;
    color: rgb(115, 115, 115);
    padding:0 2rem;
    position: fixed;
    bottom: 0;
    left: 0;;
}

</style>
