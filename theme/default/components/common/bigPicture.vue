<template lang="html">
<div class="bigPic">
  <img :src="src" :alt="alt">
</div>
</template>

<script>
export default {
  props:['src','alt'],

}
</script>

<style lang="css" scoped>
.bigPic{
  z-index:11;
  position: fixed;
  width:100%;
  height:100%;
  top:0;
  left: 0;
  background-color: rgba(4, 4, 4, 0.5);
  animation: bigPicShow 0.5s;
}
.bigPic img{
  width: 60%;
  max-height: 80%;
}
@keyframes bigPicShow {
  from {
    width:0%;
    height:0;
    top:50%;
    left:50%;
  }
  to {
    width:100%;
    height:100%;
    top:0;
    left:0;
  }
}
</style>
