<template>
  <span class="login-area">
    <a @click.prevent="area1Click">{{area1}}</a><a @click.prevent="area2Click">{{area2}}</a>
  </span>
  <Teleport to="body">
    <div class="model" v-if="show">
      <input class="close-button" type="button" value="X" @click="()=>{show=false;passWordInput='';passWordConfirm='';oldPassWord='';}">
      <div v-if="!logined&&whichArea">
        <label for="username">your name:</label><input id="username" v-model="userName"/><br>
        <label for="psw">your password:</label><input type="password" id="psw" v-model="passWord"/><br>
        <input type="button" class="button" value="login!" @click="login">
      </div>
      <div v-else-if="!logined&&!whichArea">
        <label for="setusername">set your name:</label><input id="setusername" v-model="userName"/><br>
        <label for="setpsw">set your password:</label><input type="password" id="setpsw" v-model="passWord"/><br>
        <label for="cfmpsw">repeat your password:</label><input type="password" id="cfmpsw" v-model="passWordConfirm"/><br>
        <input type="button" class="button" value="regist!" @click="regist">
      </div>
      <div v-else>
        <label for="usernameshow">your name:</label><input value="userName" readonly="true"><br>
        <label for="oldpsw">your old password:</label><input type="password" id="oldpsw" v-model="oldPassWord"/><br>
        <label for="newpsw">set your new password:</label><input type="password" id="newpsw" v-model="passWordInput"/><br>
        <label for="cfmnewpsw">repeat your password:</label><input type="password" id="cfmnewpsw" v-model="passWordConfirm"/><br>
        <input type="button" class="button" value="change!" @click="changePsw">
      </div>
    </div>
  </Teleport>
</template>

<script>
import axios from 'axios';

export default{
  name:'LoginArea',
  emits:['timeToUpdate'],
  props:['tracks'],
  data(){
    return{
      logined:false,
      whichArea:true,
      //true for area1,false for area2
      show:false,
      userName:'',
      passWordInput:'',
      passWord:'',
      passWordConfirm:'',
      oldPassWord:'',
    }
  },
  /*mounted(){
    let acdata=JSON.parse(localStorage.getItem('acdata'));
    if(acdata){
      this.userName=acdata.userName;
      this.passWord=acdata.passWord;
      if(this.login()){
        this.logined=true;
      }
      else{
        alert('登录信息过期，请重新登录。');
        localStorage.clear();
        this.logined=false;
      }
    }
  },  */
  computed:{
    area1(){
      return this.logined?this.userName:'login';
    },
    area2(){
      return this.logined?'logout':'regist';
    },
  },
  watch:{
    tracks:{
      handler(tracks){
        if(this.logined){
          axios.post('/api/updatetracks',{'username':this.userName,'tracks':tracks},{"Content-Type": "application/json"})
            .then(function(res2){
              console.log(res2);
              if(res2.data.okCode!='1'){
                alert(res2.data.message);
              }
            })
        }
      }
    }
  },
  methods:{
    area1Click(){
      this.show=true;
      this.whichArea=true;
    },
    area2Click(){
      if(!this.logined){
        this.show=true;
        this.whichArea=false;
      }
      else{
        this.show=false;
        this.logined=false;
        localStorage.clear();
        location.reload();
      }
    },
    login(){
      let flag=true;
      if([this.userName,this.passWord].includes('')){flag=false;alert('全部项都要写！');}
      var that=this;
      if(flag){
        axios.post('/api/login',{'username':this.userName,'password':this.passWord},{"Content-Type": "application/json"},
            )
          .then((response)=>{
            console.log(response);
            if(response.data.okCode=='1'){
              alert(response.data.message);
              that.logined=true;
              localStorage.setItem('acdata',JSON.stringify({'userName':that.userName,'passWord':that.passWord}));
              that.show=false;
              axios.get('/api/gettracks?username='+that.userName).then(function(response){
                console.log(response);
                if(response.data.okCode=='1'){
                  let temp=JSON.parse(response.data.data).tracks;
                  console.log(temp);
                  if(temp.length==0){
                    localStorage.setItem('tracks',JSON.stringify([]));
                  }
                  else{
                    localStorage.setItem('tracks',JSON.stringify(temp));
                  }
                  that.$emit('timeToUpdate');
                }
                else{
                  alert(response.data.message);
                }
              }).catch(function(error){console.log(error);alert('error发生');});
              return true;
            }
            else{
              alert(response.data.message);
              return false;
            }
          })
          .catch(function(error){console.log(error);alert('error发生')});
      }
      return false;
    },
    regist(){
      //axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      let flag=true;
      if([this.userName,this.passWord,this.passWordConfirm].includes('')){flag=false;alert('全部项都要写！');}
      if(this.passWord!=this.passWordConfirm){flag=false;alert('两次密码输入不一致！');}
      var that=this;
      if(flag){
        axios.post('/api/regist',{'username':this.userName,'password':this.passWord},{"Content-Type": "application/json"},
            )
          .then(function(response){
            console.log(response);
            if(response.data.okCode=='1'){
              alert(response.data.message);
              that.logined=true;
              localStorage.setItem('acdata',JSON.stringify({'userName':that.userName,'passWord':that.passWord}));
              that.show=false;
              axios.post('/api/updatetracks',{'username':that.userName,'tracks':JSON.parse(localStorage.getItem('tracks'))},{"Content-Type": "application/json"})
                .then(function(res2){
                  console.log(res2);
                  if(res2.data.okCode!='1'){
                    alert(res2.data.message);
                  }
                })
              return true;
            }
            else{
              alert(response.data.message);
            }
          })
          .catch(function(error){console.log(error);alert('error发生')});
      }
      return false;
    },
    changePsw(){
      let flag=true;
      if([this.oldPassWord,this.passWordInput,this.passWordConfirm].includes('')){flag=false;alert('全部项都要写！');}
      if(this.passWordInput!=this.passWordConfirm){flag=false;alert('两次密码输入不一致！');}
      var that=this;
      if(flag){
        axios.post('/api/changepsw',{'username':this.userName,'password':this.passWordInput,'oldpassword':this.oldPassWord},{"Content-Type": "application/json"},
            )
          .then(function(response){
            console.log(response);
            if(response.data.okCode=='1'){
              alert(response.data.message);
              localStorage.setItem('acdata',JSON.stringify({'userName':that.userName,'passWord':that.passWordInput}));
              that.passWord=that.passWordInput;
              that.show=false;
              return true;
            }
            else{
              alert(response.data.message);
              return false;
            }
          })
          .catch(function(error){console.log(error);alert('error发生')});
      }
      return false;
    },
  },
}
</script>

<style scoped>
a{
  padding-right: 0.5em;
}
.login-area{
  float:right;
}
.model{
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  background-color: bisque;
  border-style:dashed;
}
.close-button{
  float:right;
}
.button{
  margin-left: 40%;
}
</style>