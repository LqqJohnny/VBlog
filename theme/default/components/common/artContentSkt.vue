<template lang="html">

  <div class="artContentSkt">
    <div class="line short"></div>
    <div class="line "></div>
    <div class="line middle"></div>
    <div class="line long"></div>
    <div class="line longer"></div>
    <div class="line long"></div>
    <div class="line middle"></div>
    <div class="line "></div>
    <div class="line middle"></div>
    <div class="line long"></div>

    <div class="img"></div>

    <div class="line middle"></div>
    <div class="line longer"></div>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="css" scoped>

.artContentSkt{
  padding: 2rem;
}
.artContentSkt .line{
  height :0.5rem;
  width: 10rem;
  background-color: #def6fe;
  margin: 0.5rem 0;
  border-radius:0.5rem;
  position: relative;
}
.artContentSkt .img{
  background: url(../../src/img.png) no-repeat;
  height:120px;
  width:100%;
  margin: 0.5rem auto;
  text-align: center;

}
.line.long {
  width:20rem;
}
.line.short{
  width: 7rem;
}
.line.middle{
  width: 15rem;
}
.line.longer{
  width:25rem;
}

</style>
