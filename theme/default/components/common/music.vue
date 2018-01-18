<template lang="html">
  <div id="musicbox" :class="{showing : showing}">
    <audio :src="src" :autoplay="autoplay" id="music" :loop="loop">
        您的浏览器版本过低，无法播放，请及时升级
    </audio>
    <div class="musicname">
      <marquee behavior="alternate" direction="left" scrollamount=1> &nbsp;&nbsp;&nbsp;  {{musicName}} &nbsp;&nbsp;&nbsp;  </marquee>
    </div>
    <div class="hide-show" @click="show_hide"> {{showing?"<":">"}} </div>
    <div class="controls">
        <div class="play-pause" :class="{playing:playing , pausing:!playing}" id="playPause" @click="change"></div>
    </div>


</div>
</template>

<script>

export default {
  props:["src","autoplay","loop"],
  data(){
    return {
        playing:this.autoplay,
        showing:true
    }
  },
  computed:{
    musicName (){
      return this.src.replace(/\/static\/media\//,'').split(".")[0];
    }
  },
  methods:{
    change(){
      this.playing = !this.playing;
      var audio = document.getElementById('music');
      if(this.playing){
        audio.play();
      }else{
        audio.pause();
      }

    },
    show_hide(){
      this.showing = !this.showing;
    }
  }
}
</script>

<style lang="css" scoped>
.hide-show{
  float: right;
  width:10px;
  height:40px;
  line-height:40px;
  margin-left:10px;
  background-color: #4AAFE3;
  color:#fff;
  padding:0 3px;
  cursor:pointer;
}
#musicbox{
  width:220px;
  height:40px;
  position: absolute;
  bottom: 4rem;
  left:-170px;
  padding-left:10px;
  box-shadow: 0px 0px 5px 1px #b8b8b8;
  animation: slideOut 0.5s;
}
.play-pause{
  width:30px;
  height:30px;

  margin-top:5px;
}
.playing{
  background: url(../../src/pause.png)  no-repeat;
  background-size: 30px 30px;
}
.pausing{
  background: url(../../src/play.png)  no-repeat;
  background-size: 30px 30px;
}
.controls{
  float:right;
}
.musicname{
  white-space:nowrap;
  line-height: 30px;overflow: hidden;
  width:160px;
  float:left;
  line-height: 40px;
}
#musicbox.showing{
  left:0;
  animation: slideIn 0.5s;
}

@keyframes slideIn {
  from {left: -170px; }
  to {left : 0 ;}
}
@keyframes slideOut {
  from {left: 0; }
  to {left : -170px ;}
}
</style>
