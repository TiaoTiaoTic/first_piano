<template>
  <li class="single-track">
    <input type="checkbox" v-model="checked" :onclick="canSelect">
    <span>{{this.track.trackName}}</span>
    <input type="button" value="X" @click="clickDelete()" :disabled="disabled">
  </li>
</template>

<script>
export default{
  name:'SingleTrack',
  data(){
    return{
      checked:false,
      canSelect:"return 1",
      disabled:false,
    }
  },
  emits:['deleteTrack','checkSelect'],
  props:{
    track:Object,
    isPlaying:Boolean
  },
  methods:{
    clickDelete(){
      this.$emit('deleteTrack',this.track.trackID);
    },
    playPitch(pitch){
      let audio = new Audio();
      audio.preload='meta';
      audio.src = 'https://www.musicca.com/lydfiler/piano/'+pitch+'.mp3';
      audio.play();
    }
  },
  watch:{
    checked:{
      handler(value){
        this.$emit('checkSelect',this.track.trackID,value);
      }
    },
    isPlaying:{
      handler(value){
        if(value==true){
          this.canSelect='return false';
          this.disabled=true;
          if(this.checked==true){
            console.log(this.track.trackName+'要播放啦'+this.track);
            for(let i=0;i<this.track.pitchs.length;i++){
              setTimeout(()=>this.playPitch(this.track.pitchs[i]),this.track.times[i+1]);
            }
          }
        }
        if(value==false){
          this.canSelect='return 1';
          this.disabled=false;
        }
      }
    }
  }
}
</script>

<style scoped>
.single-track{
  list-style: none
}
</style>