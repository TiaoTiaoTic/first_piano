<template>
  <input type="button" class="record-button" @click="recordButtonClick">
</template>

<script>
export default{
  name:'RecordButton',
  data(){
    return{
      isRecording:false
    }
  },
  emits:['recordStart','recordStop'],
  methods:{
    recordButtonClick(){
      if(!this.isRecording){
        this.isRecording=true;
        (document.getElementsByClassName('record-button'))[0].style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAByCAIAAAANoWJtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEk0AABJNAfOXxKcAAAHfSURBVHhe7ZCxTQMAEMQYhJL9N2OG0LiKroA43yBbV1snfzzijOIeUtxDintIcQ8p7iHFPaS4hxT3kOIeUtxDintIcQ8p7iHFPaS4hxT3kOIeUtxD/kPc78+v9w6v5pW4T1feNex/58njh1dT3DG8muKO4dUUdwyvprhjeDXFHcOrKe4YXk1xx/BqijuGV1PcMbya4o7h1RR3DK+muGN4NcUdw6sp7hheTXHH8GqKO4ZXU9wxvJrijuHVFHcMr6a4Y3g1xR3DqynuGF5Nccfwaoo7hldT3DG8muKO4dUUdwyvprhjeDXFHcOrKe4YXk1xx/BqijuGV1PcMbya4o7h1RR3DK+muGN4NcUdw6sp7hheTXHH8GqKO4ZXU9wxvJrijuHVFHcMr6a4Y3g1xR3DqynuGF5Nccfwaoo7hldT3DG8muKO4dUUdwyvprhjeDXFHcOrKe4YXk1xx/BqijuGV1PcMbya4o7h1RR3DK+muGN4NcUdw6sp7hheTXHH8GqKO4ZXU9wxvJrijuHVFHcMr6a4Y3g1xR3DqynuGF7NK3HjlxT3kOIeUtxDintIcQ8p7iHFPaS4hxT3kOIeUtxDintIcQ8p7iHFPaS4hxT3kOIeUtxDintIcQ8p7hmPxw9uTQz7+zmB8AAAAABJRU5ErkJggg==)";
        this.$emit('recordStart');
      }
      else{
        this.isRecording=false;
        (document.getElementsByClassName('record-button'))[0].style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAByCAIAAAANoWJtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEk0AABJNAfOXxKcAAAM5SURBVHhe7ZDJcd0wEAUdiI/OPzPFIKPqNyTycQPAAdfX1UcSM9N/vk03HLcjjtsRx+2I43bEcTty0bhff/8Vyg+X5CpxJdkeefECnBlXooTLmPM4Ia4kOEAGH85xceXgU2SVozgirlx4uqzVn75x5apLyYo96RVXLrmsrNuH+Liy/S1k9WiC48rSN5IDQomMK+veTs6IIyaubHlrOSmCgLiy3APksN3sjStrPUbO20d7XNnmkXJqK41xZYkHy8FNtMSV8Y+Xs+upjiuDXyLHV1IXV0a+ShLU4LilkqCGirgy7IUSopjSuDLmtZKjjKK4MuDlEqUAx62WKAVsx5WnbZI0W2zElUftjwRaxXEbJdAqa3HlOSuSaRnHbZdMyyzGlYfsrMRawHF3SawF5uPKE3ZFks3huHsl2RwzceVnuynhJjhugISb4LgBEm6CxpXfbKHkG+O4MZJvjOPGSL4xo7jyg62SiAMcN0wiDnDcMIk4wHHDJOIAxw2TiAMcN1I6Zn7jyne2QVJmHDdSUmYcN1JSZhw3UlJmHDdSUmYcN1JSZhw3UlJmHDdSUmYcN1JSZhw3UlJmHDdSUmYcN1JSZn7jJuRTWysdM44bJhEHOG6YRBzguGEScYDjhknEAY4bJhEHjOIm5AdbKPnGOG6M5BvjuDGSb4zGTchvdlPCTXDcAAk3wXEDJNyEmbgJ+dmuSLI5HHevJJtjPm5CnrCzEmsBx90lsRZYjJuQh6xIpmUct10yLbMWNyHP2R8JtIrjNkqgVTbiJuRRmyTNFttxE/K0pcsWjlstUQooipuQAa+VHGWUxk3ImBdKiGIq4iZk2KskQQ2OWyoJaqiLm5CRL5HjK6mOm5DBj5ez62mJm5DxD5aDm2iMm5AlHimnttIe94Ns8xg5bx974yZkrQfIYbsJiJuQ5W4tJ0UQEzchK95UjgkiLO4H2fVGckAowXETsvQtZPVo4uN+kO0vK+v2oVfcD3LJpWTFnvSN+0GuOl3W6s8RcT/IhafIKkdxXNwPcu1hMv5Yjo77gxzfSYadxGlxh0iRnfLoBbhE3CnSa0V+uCQXjfsMHLcjjtsRx+2I43bEcbvx/f0fJuc9vGc0V94AAAAASUVORK5CYII=)";
        this.$emit('recordStop');
      }
    }
  }
}
</script>

<style scoped>
.record-button{
  padding: 3.5em;
  padding-right: 5em;
  background-image: url(../assets/record_button.png);
}
</style>