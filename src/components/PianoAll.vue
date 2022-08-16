<template>
  <div class="piano">
    <template v-for="pp in pitchs" :key="pp">
      <PianoKey class="piano-key" :class="classobject(pp)" :pitch='pp' @keyPlay="keyPlay"></PianoKey>
    </template>
  </div>
</template>

<script>
import PianoKey from './PianoKey.vue'

export default {
  name: 'PianoAll',
  props:{
    isRecording:Boolean
  },
  emits:['recordOver'],
  data:()=>({
    pitchs:Array(63-28+1).fill(0).map((v,k)=>k+28),
    recordTimes:[],
    recordPitchs:[]
  }),
  components: {
    PianoKey
  },
  watch:{
    isRecording:{
      handler(newValue){
        if(newValue==true){
          this.recordTimes.push(performance.now());
        }else{
          this.$emit('recordOver',this.recordTimes,this.recordPitchs);
          this.recordTimes.length=0;
          this.recordPitchs.length=0;
        }
      }
    }
  },
  computed:{
    
  },
  methods:{
    classobject(pp){
      let flag=false;
      if([2,4,7,9,11].includes((pp-3)%12)){flag=true}
      return {
        'black-key':flag,
        'white-key':!flag
      }
    },
    keyPlay(pitch,time){
      if(this.isRecording){
        this.recordTimes.push(time);
        this.recordPitchs.push(pitch.toString());
      }
    },
    text(){
      console.log(this.recordTimes);
      console.log(this.recordPitchs);
    }
  },
  mounted(){
    let blackkeys=document.getElementsByClassName('black-key');
    for(let i=0;i<blackkeys.length;i++){
      blackkeys[i].style.left=blackkeys[i].offsetLeft-15+'px'
    }
  }
}
</script>

<style scoped>
.piano-key{
  padding-left: 1em;
  padding-right: 1em;
}
.black-key{
  background-color: black;
  padding-top: 3em;
  padding-bottom: 3em;
  position: absolute;
}
.white-key{
  background-color: white;
  padding-top: 5em;
  padding-bottom: 5em;
}

</style>