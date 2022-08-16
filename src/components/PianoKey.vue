<template>
  <input type="button" @mousedown='play(pitch)'/>
</template>

<script>
export default {
  name: 'PianoKey',
  props:{
    pitch:Number,
  },
  emits:['keyPlay'],
  methods:{
    play(pitch){
      let audio = new Audio();
      audio.preload='meta';
      audio.src = 'https://www.musicca.com/lydfiler/piano/'+pitch+'.mp3';
      audio.play();
      this.$emit('keyPlay',pitch,performance.now());
    }
  },
  computed:{
    
  }
}
</script>

<style scoped>

</style>