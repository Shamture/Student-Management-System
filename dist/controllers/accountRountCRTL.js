"use strict";var path=require("path"),fs=require("fs"),captchapng=require("captchapng"),databasemanager=require(path.join(__dirname,"../tools/databasemanager.js"));exports.getLoinPage=function(e,s){s.sendFile(path.join(__dirname,"../view/login.html"))},exports.getVcodeImage=function(e,s){var a=parseInt(9e3*Math.random()+1e3);e.session.vcode=a;var n=new captchapng(80,30,a);n.color(0,0,0,0),n.color(80,80,80,255);var t=n.getBase64(),o=new Buffer(t,"base64");s.writeHead(200,{"Content-Type":"image/png"}),s.end(o)},exports.login=function(e,s){var a=e.body,n={status:2,message:"登录成功!"};if(e.session.vcode!=a.vcode)return n.status=0,n.message="验证码错误",void s.json(n);databasemanager.findOne("account",{username:a.username,password:a.password},function(t,o){null==o?(n.status=1,n.message="用户名或密码错误"):e.session.username=a.username,s.json(n),db.close()}),exports.logout=function(e,s){e.session.username=null,s.setHeader("Content-Type","text/html;charset=utf-8"),s.end("<script>window.location.href='/account/login'<\/script>")},exports.getRegisterPage=function(e,s){s.sendFile(path.join(__dirname,"../view/register.html"))},exports.register=function(e,s){var a={status:0,message:"注册成功"};databasemanager.insertOne("account",e.body,function(e,n){null==n&&(a.status=1,a.message="注册失败"),s.send(a)})}};