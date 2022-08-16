var http = require('http');
var url = require('url');
var mysql = require('mysql');

http.createServer(function (request, response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.writeHead(200, {'Content-Type': 'application/json',});
  const reqMethod=request.method;
  const path=request.url.split('?')[0];

  if(reqMethod=='GET'){
    const params=url.parse(request.url,true).query;
    if(path=='/gettracks'){
      console.log("params:",params.username);
      var connection = mysql.createConnection({     
        host     : 'localhost',       
        user     : 'first_piano_user',              
        password : '4536251',       
        port: '3306',                   
        database: 'first_piano' 
      });
      connection.connect();
      let query="SELECT tracks FROM tracks WHERE user_id=(SELECT user_id FROM users WHERE user_name='"+params.username+"');";
      connection.query(query,function(error,result){
        if(error){
          console.log('[database ERROR] - ',err.message);
        }
        console.log(result[0].tracks);
        response.end(resData('1','获得tracks成功',result[0].tracks));
        connection.end();
      });
      return ;
    }
    return ;
  }
  else if(reqMethod=='POST'){
    if(path=='/regist'){
      let postData='';
      request.on('data', function(chunk){    
        postData += chunk.toString();
      });
      request.on('end',function(){
        console.log("postdata:",(postData));
        postData=JSON.parse(postData);
        var connection = mysql.createConnection({     
          host     : 'localhost',       
          user     : 'first_piano_user',              
          password : '4536251',       
          port: '3306',                   
          database: 'first_piano' 
        });
        connection.connect();
        let query="INSERT INTO users (user_name,password) VALUES ('"+postData.username+"','"+postData.password+"');";
        connection.query(query,function (err, result) {
          if(err){
            console.log('[database ERROR] - ',err.message);
            if(err.errno==1062);{
              response.end(resData('2','用户名已占用','fail'));
              connection.end();
            }
            return 0;
          }
          if(result){
            console.log(result);
            response.end(resData('1','注册成功','success'));
            connection.end();
          }
          else{
            response.end(resData('0','注册失败','fail'));
            connection.end();
          }
        })
      });
      return ;
    }
    else if(path=='/login'){
      let postData='';
      request.on('data', function(chunk){    
        postData += chunk.toString();
      });
      request.on('end',function(){
        console.log("postdata:",(postData));
        postData=JSON.parse(postData);
        var connection = mysql.createConnection({     
          host     : 'localhost',       
          user     : 'first_piano_user',              
          password : '4536251',       
          port: '3306',                   
          database: 'first_piano' 
        });
        connection.connect();
        let query="SELECT user_id FROM users WHERE user_name='"+postData.username+"' AND password='"+postData.password+"'";
        connection.query(query,function (err, result) {
          if(err){
            console.log('[database ERROR] - ',err.message);
            return 0;
          }
          if(result.length!=0){
            console.log(result);
            response.end(resData('1','登录成功','success'));
            connection.end();
          }
          else{
            response.end(resData('0','登录失败','fail'));
            connection.end();
          }
        })
      });
      return ;
    }
    else if(path=='/changepsw'){
      let postData='';
      request.on('data', function(chunk){    
        postData += chunk.toString();
      });
      request.on('end',function(){
        console.log("postdata:",(postData));
        postData=JSON.parse(postData);
        var connection = mysql.createConnection({     
          host     : 'localhost',       
          user     : 'first_piano_user',              
          password : '4536251',       
          port: '3306',                   
          database: 'first_piano' 
        });
        connection.connect();
        let query="SELECT user_id FROM users WHERE user_name='"+postData.username+"' AND password='"+postData.oldpassword+"'";
        connection.query(query,function (err, result) {
          if(err){
            console.log('[database ERROR] - ',err.message);
            return 0;
          }
          if(result.length!=0){
            console.log(result);
            query="UPDATE users SET password='"+postData.password+"' WHERE user_id=(SELECT a.user_id FROM (SELECT user_id FROM users WHERE user_name='"+postData.username+"')AS a)";
            connection.query(query,function (err, result) {
              if(err){
                console.log('[database ERROR] - ',err.message);
                return 0;
              }
              response.end(resData('1','改密成功','success'));
              connection.end();
            });
          }
          else{
            response.end(resData('2','旧密码错误','fail'));
            connection.end();
          }
        })
      });
      return ;
    }
    else if(path=='/updatetracks'){
      let postData='';
      request.on('data', function(chunk){    
        postData += chunk.toString();
      });
      request.on('end',function(){
        console.log("postdata:",(postData));
        postData=JSON.parse(postData);
        var connection = mysql.createConnection({     
          host     : 'localhost',       
          user     : 'first_piano_user',              
          password : '4536251',       
          port: '3306',                   
          database: 'first_piano' 
        });
        connection.connect();
        let query="SELECT track_id FROM tracks WHERE user_id=(SELECT user_id FROM users WHERE user_name='"+postData.username+"')";
        connection.query(query,function (err, result) {
          if(err){
            console.log('[database ERROR] - ',err.message);
            return 0;
          }
          if(result.length!=0){
            query="UPDATE tracks SET tracks='{"+'"'+"tracks"+'"'+":"+JSON.stringify(postData.tracks)+"}' WHERE user_id=(SELECT user_id FROM users WHERE user_name='"+postData.username+"')";
            connection.query(query,function (err, result) {
              if(err){
                console.log('[database ERROR] - ',err.message);
                return 0;
              }
              response.end(resData('1','更新tracks成功','success'));
              connection.end();
            });
          }
          else{
            query="INSERT INTO tracks (user_id,tracks) VALUES ((SELECT user_id FROM users WHERE user_name='"+postData.username+"'),'{"+'"'+"tracks"+'"'+":"+JSON.stringify(postData.tracks)+"}')"
            connection.query(query,function (err, result) {
              if(err){
                console.log('[database ERROR] - ',err.message);
                return 0;
              }
              response.end(resData('1','成功插入tracks','fail'));
              connection.end();
            });
          }
        });
      });
      return ;
    }
    return ;
  }
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.end('404 NOT FOUND');
  return ;
}).listen(8888);

console.log('Server running at http://127.0.0.1:8888/');

function resData(okCode,message,data){
  return JSON.stringify({'okCode':okCode,"message":message,"data":data});
}