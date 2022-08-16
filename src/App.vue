<template>
<LoginArea @timeToUpdate="tracksFresh" :tracks="tracks"/>
<div class="table">
  <div class="table-row">
    <div class="table-cell playarea">
      <PlayArea :tracks='tracks' v-on:deleteTrack="deleteTrack"/>
    </div>
    <div class="table-cell piano">
      <PianoAll :isRecording="isRecording" @recordOver="newTrack"/>
      <RecordButton class="record-button" @recordStart="()=>isRecording=true" @recordStop="()=>isRecording=false"/>
    </div>
  </div>
</div>
<footer>
  CopyRight©2022-2022 by Zhennan Huang Just for fun.
</footer>
</template>

<script>
import PianoAll from './components/PianoAll.vue'
import RecordButton from './components/RecordButton.vue';
import PlayArea from './components/PlayArea.vue';
import LoginArea from './components/LoginArea.vue';

export default {
  name: 'App',
  components: {PianoAll,RecordButton,PlayArea,LoginArea},
  data(){
    let tracks=JSON.parse(localStorage.getItem('tracks'));
    let count = JSON.parse(localStorage.getItem('count'));
    if(!count){
      let count=0;
      localStorage.setItem('count',JSON.stringify(count));
    }
    if(!tracks){
      tracks=[];
      localStorage.setItem('tracks',JSON.stringify(tracks));
    }
    return{
      isRecording:false,
      tracks:tracks,
      count:count
    }
  },
  watch:{
    isRecording:{
      handler(newValue){
        console.log('from app:'+newValue)
      }
    }
  },
  methods:{
    newTrack(times,pitchs){
      let tracks=JSON.parse(localStorage.getItem('tracks'));
      times=times.map(i=>i-times[0]);
      tracks.push({'trackID':this.count,'trackName':'Name_'+this.count,'times':times,'pitchs':pitchs});
      localStorage.setItem('tracks',JSON.stringify(tracks));
      this.tracks=tracks;
      this.count++;
      localStorage.setItem('count',JSON.stringify(this.count));
    },
    deleteTrack(trackId){
      let tracks=JSON.parse(localStorage.getItem('tracks'));
      tracks=tracks.filter(item=>{return item.trackID!=trackId});
      localStorage.setItem('tracks',JSON.stringify(tracks));
      this.tracks=tracks;
    },
    tracksFresh(){
      this.tracks=JSON.parse(localStorage.getItem('tracks'));
    },
  },
}
</script>

<style>
footer{
  background-color: #203e54;
  color:            #efe5d0;
  text-align:       center;
  padding:          15px;
  margin: 0px 10px 10px 10px;
  font-size:        90%;
}
.table{
  display:table;
  width:70%;
  text-align:center;
  margin-left: 10%;
}
.table-row{
  display: table-row;
}
.table-cell{
  display: table-cell;
}
.playarea{
  width:20%;
}
.piano{
  margin-top: 4em;
  width:700px;
  margin-left: 10%;
}
.record-button{
  margin-top: 4em;
}
</style>
