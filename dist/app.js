"use strict";var express=require("express"),path=require("path"),session=require("express-session"),bodyParser=require("body-parser"),app=express();app.use(express.static("./statics")),app.use(session({secret:"keyboard cat",resave:!0,rolling:!0,saveUninitialized:!1,cookie:{maxAge:18e4}})),app.use(bodyParser.urlencoded({extended:!1})),app.all("/*",function(e,r,s){e.url.includes("account")?s():e.session.username?s():(r.setHeader("Content-Type","text/html;charset=utf-8"),r.end("<script>alert('您还没有登录，请先登录');location.href='/account/login'<\/script>"))});var accountRouter=require(path.join(__dirname,"routers/accountRouter.js"));app.use("/account",accountRouter);var studentManagerRouter=require(path.join(__dirname,"routers/studentManagerRouter.js"));app.use("/studentmanager",studentManagerRouter),app.listen(3e3,"127.0.0.1",function(e){e&&console.log(e),console.log("启动成功!")});