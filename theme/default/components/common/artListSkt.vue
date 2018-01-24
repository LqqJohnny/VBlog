<template lang="html">
<div class="artListSkt">
  <div class="line short"></div>
  <div class="line "></div>
  <div class="line middle"></div>
  <div class="line long"></div>
  <div class="line longer"></div>
</div>
</template>

<script>
export default {

}
</script>

<style lang="css" scoped>
.artListSkt{
  padding: 2rem;
}
.artListSkt .line{
  height :1rem;
  width: 10rem;
  background-color: rgb(222, 246, 254);
  margin: 0.5rem 0;
  border-radius:0.5rem;
  position: relative;
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
