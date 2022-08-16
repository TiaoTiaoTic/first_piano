<template>
  <input type="button" class="play-button" @click="playButtonClick">
</template>

<script>
export default{
  name:'PlayButton',
  emits:['playStart','playStop'],
  data(){
    return{
      isPlay:false
    }
  },
  methods:{
    playButtonClick(){
      if(this.isPlay){
        this.isPlay=false;
        this.$emit('playStop');
        document.getElementsByClassName("play-button")[0].style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAByCAIAAAANoWJtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEk0AABJNAfOXxKcAAAKQSURBVHhe7ZBZbsMwDAV7id65t04dTOAAhuFFpiQubzA/QWSJnJ+X6MYn7t/PL/JTmPCOu5Zd5T/xkP24yAnRzFFc5Jxo4Dwuclrc4mpc5BtxkXtxkS/FKS1xke/FAe1xkVvELk/jIneJDTZxkRvFimVc5F6xYB8Xub04veIib5Slb9xVHqvGoLjIk3UYGhd5uAIT4iLP52ZaXGSIrEyOi4ySDxdxkYEy4SguMlYO3MVFhouO07jIiHFxHRcZNCIB4iLjxiJMXGToKASLi4zun5BxkQU8EzgusoZPwsdFlvFGkrjISn5IFRdZzAMJ4yLrzSVtXGTJWSSPi6w6nhJxkYVHUigusvYYysVFlu9N0bhIgn6UjrtKC3MU9ytFDFHcrXQxQXH3pc5DFPdIGjWjuOdSqgHFvSq9bqG496TaRRS3RdqdorjtUvAAxX0qHXdRXBupuUFxLaXpiuLaS9kFxe2i4nZUcTuquL2k7ILiWkrTFcW1kZobFPepdNxFcdul4AGK2yLtTlHce1LtIop7VXrdQnHPpVQDinskjZpR3H2p8xDF3UoXExT3K0UMUdy3tDCnelwqdKJuXPbvSsW4bD6AWnHZeRhV4rLtYPLHZc8pZI7LhhPJGZfdppMtLls5IU9c9nFFhrhs4pDYcdnBLVHjMr1z4sVl7hBEisvEgYgRl1nD4T0uUwbFb1zmC43HuEyWAF9xmSkNXuIyTTLmx2WOlMyMywSJmROXt9MzOi6vFmFcXN4rxYi4vFSQvnF5oyy94nJ7cezjcq9YsIzLjWLFJi53iQ1P43KL2KU9Lt+LA1ri8qU45V5cvhEXuRqX0+IW53E5Jxo4issJ0cx+XP4TD3nHXVDWHnziCnter38RT5tN1snqTwAAAABJRU5ErkJggg==)";
      }
      else{
        this.$emit('playStart');
        this.isPlay=true; 
        document.getElementsByClassName("play-button")[0].style.backgroundImage="url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAByCAIAAAANoWJtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEk0AABJNAfOXxKcAAAHYSURBVHhe7ZCxDUIBEIVcwp3d+tvQPhtyjYGwALyeOKO5hzT3kOYe0txDmntIcw9p7iHNPaS5hzT3kOYe0txDmntIcw9p7iHNPaS5h6i5n9f7jyVS0NwpkYLmTokUNHdKpKC5UyIFzZ0SKWjulEhBc6dECpo7JVLQ3CmRguZOiRQ0d0qkoLlTIgXNnRIpaO6USEFzp0QKmjslUtDcKZGC5k6JFDR3SqSguVMiBc2dEilo7pRIQXOnRAqaOyVS0NwpkYLmTokUNHdKpKC5UyIFzZ0SKWjulEhBc6dECpo7JVLQ3CmRguZOiRQ0d0qkoLlTIgXNnRIpaO6USEFzp0QKmjslUtDcKZGC5k6JFDR3SqSguVMiBc2dEilo7pRIQXOnRAqaOyVS0NwpkYLmTokUNHdKpKC5UyIFzZ0SKWjulEhBc6dECpo7JVLQ3CmRguZOiRQ0d0qkoLlTIgXNnRIpaO6USEFzp0QKmjslUtDcKZGC5k6JFDR3SqSguVMiBc2dEilo7pRIQXOnRAqaOyVS0NwpkYLmTokUNHdKpKC5UyIFzZ0SKVBz4zfNPaS5hzT3kOYe0txDmntIcw9p7iHNPaS5hzT3kOYe0txDmntIcw9p7iHNPeN5vocR1mXzlnCWAAAAAElFTkSuQmCC)";
      }
    }
  }
}
</script>

<style scoped>
.play-button{
  background-image: url('../assets/play_button.png');
  padding: 3.5em;
  padding-right: 5em;
}
</style>