<template>
  <div>
    <div>
      <PlayButton @playStart="()=>isPlaying=true" @playStop="()=>isPlaying=false"/>
    </div>
    <div>
      <ul>
        <SingleTrack v-for="item in tracks" :key='item.trackId' :track="item" :isPlaying="isPlaying" @deleteTrack="deleteTrack" @checkSelect="changeSelected"></SingleTrack>
      </ul>
    </div>
  </div>
</template>

<script>
import PlayButton from './PlayButton.vue';
import SingleTrack from './SingleTrack.vue';
export default{
  data(){
    return{
      isPlaying:false,
      tracksSelected:[]
    }
  },
  components: { PlayButton, SingleTrack },
  props:['tracks'],
  emits:['deleteTrack'],
  methods:{
    deleteTrack(trackId){
      this.$emit('deleteTrack',trackId);
    },
    changeSelected(id,value){
      if(value){
        this.tracksSelected.push(id);
      }
      else{
        this.tracksSelected=this.tracksSelected.filter(item=>{return item!=id});
      }
      console.log(this.tracksSelected)
    }
  },
  watch:{
    
  }
}
</script>

<style scoped>

</style>